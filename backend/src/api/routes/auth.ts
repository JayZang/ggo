import { Router, Request, Response } from 'express'
import { Container } from 'typedi'

import AuthService from '@/services/AuthService'
import { jwt as jwtConfig } from '@/config'

const router = Router()
const authService = Container.get(AuthService)

export default (app: Router) => {
    app.use('/auth', router)

    router.post('/login', async (req: Request, res: Response) => {
        const {
            user,
            token
        } = await authService.login(
            req.body.account_id,
            req.body.password
        )

        return user ?
            res.header(jwtConfig.authHeaderName, token).json(user) :
            res.status(400).end()
    })
}