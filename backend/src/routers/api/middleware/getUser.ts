import { NextFunction, Request, Response } from "express";

import AuthService from '@/services/AuthService'
import { jwt as jwtConfig } from '@/config'
import Container from "typedi";

const authService = Container.get(AuthService)

export default async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header(jwtConfig.authHeaderName)
        const payload = await authService.verifyAuthToken(token, req.ip)

        payload && (req.user = payload)
        req.authToken = token || undefined
    } catch { }
    
    next()
}