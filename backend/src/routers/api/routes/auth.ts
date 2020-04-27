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
            req.body.password,
            req.ip
        )

        return user ?
            res.header(jwtConfig.authHeaderName, token).json(user) :
            res.status(403).end()
    })

    router.post('/logout', async (req: Request, res: Response) => {
        const token = req.header(jwtConfig.authHeaderName)

        if (token)
            await authService.logout(token, req.ip)

        return res.end()
    })

    router.get('/check', async (req: Request, res: Response) => {
        const token = req.header(jwtConfig.authHeaderName)
        const user = req.user

        return user ?
            res.header(jwtConfig.authHeaderName, token).json(user) :
            res.status(401).end()
    })

    router.post('/line/account-link', async (req, res) => {
        const nonce = await authService.generateLineAccountLinkNonce(
            req.body.account_id,
            req.body.password
        )

        return nonce ?
            res.send({ nonce }) :
            res.status(403).end()
    })
}