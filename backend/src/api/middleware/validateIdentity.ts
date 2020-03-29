import { NextFunction, Request, Response } from "express";
import { UserIdentityType } from "@/entity/User";

export default function validateIdentity(identity: UserIdentityType) {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!req.user ||
            req.user.identity_type !== identity)
            return res.status(403).end()
        next()
    }
}