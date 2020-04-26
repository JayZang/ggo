import { NextFunction, Request, Response } from "express";

import { PermissionsList } from "@/entity/Policy";

export default function validatePermission(permission: PermissionsList) {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!req.user.permissions[permission])
            return res.status(403).end()
        next()
    }
}