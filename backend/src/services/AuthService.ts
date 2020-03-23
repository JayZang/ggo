import { getCustomRepository } from 'typeorm'
import jwt from 'jsonwebtoken'
import { Service } from 'typedi'
import bcryptjs from 'bcryptjs'
import _ from 'lodash'

import UserRepo from '@/repository/UserRepository'
import { client as redisClient } from '@/loaders/redis'
import { jwt as jwtConfig } from '@/config'
import User, { UserIdentityType } from '@/entity/User'
import PolicyRepo from '@/repository/PolicyRepository'
import Policy from '@/entity/Policy'

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
                .where({ account_id, loginable: true })
                .leftJoinAndSelect('user.policies', 'policies')
                .leftJoinAndSelect('user.groups', 'groups')
                .leftJoinAndSelect('groups.policies', 'groupPolicies')
                .getOne()
                
            if (!user || !bcryptjs.compareSync(password, user.password))
                return {}

            user.last_login_datetime = new Date
            await Promise.all([
                userRepo.save(user),
                userRepo.attachIdentity([user]),
                this.attachPermissions(user)
            ])

            // prevent the password send to client
            user.password = undefined

            const token = this.generateAuthToken(user, ip)
            await this.storeAuthToken(token, user.id)

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
     * Logout by token
     */
    public async logout(token: string, ip: string) {
        try {
            const payload = await this.verifyAuthToken(token, ip)

            if (!payload) return

            return await this.removeTokenFromStorage(token, payload.id)
        } catch {
            return
        }
    }

    /**
     * Logout user
     */
    public async logoutUser(userId: string | number) {
        try {
            return await this.removeTokensByUser(userId)
        } catch {
            return
        }
    }

    private async attachPermissions(user: User) {
        let policies: Policy[] = []

        if (user.identity_type === UserIdentityType.admin) {
            const policyRepo = getCustomRepository(PolicyRepo)
            policies = await policyRepo.find()
        } else {
            policies = user.policies
            user.groups.forEach(group => {
                group.policies.forEach(_policy => {
                    if (policies.findIndex(policy => policy.id === _policy.id) === -1)
                        policies.push(_policy)
                })
            })
        }

        user.permissions = policies.map(policy => policy.variable_name)
        return user
    }

    public async verifyAuthToken(token: string, ip: string): Promise<User | null> {
        try {
            const payload = jwt.verify(token, ip || jwtConfig.secret) as User

            if (!await this.isTokenInStorage(token))
                return null

            return payload
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

    private isTokenInStorage(token: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            redisClient.get(`auth-token:${token}`, (err, userId) => {
                if (err) reject(err)
                resolve(!!userId)
            })
        })
    }

    private removeTokenFromStorage(token: string, userId: string | number): Promise<void> {
        return new Promise((resolve, reject) => {
            redisClient.del(`auth-token:${token}`, `user-id-and-token:${userId}:${token}`, () => {
                resolve()
            })
        })
    }

    private removeTokensByUser(userId: string | number): Promise<void> {
        return new Promise((resolve, reject) => {
            redisClient.keys(`user-id-and-token:${userId}:*`, (err, keys) => {
                if (err) reject(err)
                const tokenKeys = keys.map(key => {
                    const token = key.split(`user-id-and-token:${userId}:`)[1]
                    return `auth-token:${token}`
                })
                redisClient.del(...keys, ...tokenKeys, _err => {
                    if (_err) reject(err)
                    resolve()
                })
            })
        })
    }
}