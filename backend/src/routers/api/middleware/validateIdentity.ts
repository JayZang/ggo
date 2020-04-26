import { NextFunction, Request, Response } from "express";
import { UserIdentityType } from "@/entity/User";

export default function validateIdentity(identity: UserIdentityType | UserIdentityType[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!(Array.isArray(identity) ? identity : [identity]).includes(req.user.identity_type))
            return res.status(403).end()
        next()
    }
}