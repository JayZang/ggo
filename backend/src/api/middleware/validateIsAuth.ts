import { NextFunction, Request, Response } from "express";

export default function validateIsAuth() {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user)
            return res.status(401).end()
        next()
    }
}