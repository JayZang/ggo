import { NextFunction, Request, Response } from "express";

export default async function validateIsAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.user)
        return res.status(403).end()
    next()
}