import { getCustomRepository } from 'typeorm'
import jwt from 'jsonwebtoken'
import { Service } from 'typedi'
import bcryptjs from 'bcryptjs'
import _ from 'lodash'

import UserRepo from '@/repository/UserRepository'
import { client as redisClient } from '@/loaders/redis'
import { jwt as jwtConfig } from '@/config'
import User from '@/entity/User'

@Service()
export default class AuthService {

    /**
     * User login
     */
    public async login(account_id: string, password: string, ip: string) {
        try {
            const userRepo = getCustomRepository(UserRepo)
            const user = await userRepo.createQueryBuilder('user')
                .addSelect('user.password')
                .where({
                    account_id,
                    loginable: true
                })
                .getOne()

            if (!user || !bcryptjs.compareSync(password, user.password))
                return {}

            const token = this.generateAuthToken(user, ip)
            user.last_login_datetime = new Date
            await Promise.all([
                userRepo.save(user),
                this.storeAuthToken(token, user.id)
            ])

            return {
                user,
                token
            }
        } catch (err) {
            console.log(err)
            return {}
        }
    }

    /**
     * Verify auth token 
     */
    public async check(token: string, ip: string) {
        try {
            const payload = jwt.verify(token, ip || jwtConfig.secret) as User

            if (!await this.isAuthTokenInStorage(token))
                return null

            const userRepo = getCustomRepository(UserRepo)
            return await userRepo.findOneOrFail(payload.id)
        } catch {
            return null
        }
    }

    private generateAuthToken(user: User, ip?: string) {
        return jwt.sign(
            Object.assign({}, user),
            ip || jwtConfig.secret,
            { expiresIn: jwtConfig.authValidDuration }
        )
    }

    private storeAuthToken(token: string, userId: number) {
        return new Promise((resolve, reject) => {
            redisClient.multi()
                .set(`auth-token:${token}`, userId.toString(), 'EX', jwtConfig.authValidDuration)
                .set(`user-id-and-token:${userId}:${token}`, token, 'EX', jwtConfig.authValidDuration)
                .exec(err => {
                    if (err) reject(err)
                    resolve()
                })
        })
    }

    private isAuthTokenInStorage(token: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            redisClient.get(`auth-token:${token}`, (err, userId) => {
                if (err) reject(err)
                resolve(!!userId)
            })
        })
    }
}