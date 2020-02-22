import { getCustomRepository } from 'typeorm'
import jwt from 'jsonwebtoken'
import { Service } from 'typedi'
import _ from 'lodash'

import UserRepo from '@/repository/UserRepository'
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
            const user = await userRepo.findOneOrFail({
                account_id,
                password
            })
            const token = jwt.sign(
                Object.assign({}, user), 
                ip || jwtConfig.secret,
                { expiresIn: jwtConfig.authValidDuration }
            )
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
            const userRepo = getCustomRepository(UserRepo)
            const user = await userRepo.findOneOrFail(payload.id)
            return user
        } catch {
            return null
        }
    }
}