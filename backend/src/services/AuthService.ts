import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'
import _ from 'lodash'
import jwt from 'jsonwebtoken'

import UserRepo from '@/repository/UserRepository'
import { jwt as jwtConfig } from '@/config'

@Service()
export default class AuthService {

    /**
     * User login
     */
    public async login(account_id: string, password: string) {
        try {
            const userRepo = getCustomRepository(UserRepo)
            const user = await userRepo.findOneOrFail({
                account_id,
                password
            })
            const token = jwt.sign(
                Object.assign({}, user), 
                jwtConfig.secret,
                { expiresIn: jwtConfig.authValidDuration}
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
}