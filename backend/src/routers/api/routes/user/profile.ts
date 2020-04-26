import { Router, Response, Request } from 'express'
import { Container } from 'typedi'

import { UserIdentityType } from '@/entity/User'
import validateIdentity from '@/routers/api/middleware/validateIdentity'
import MemberProfileService from '@/services/Profile/MemberProfileService'
import getImageMulter from '@/utils/multer/getImageMulter'
import AuthService from '@/services/AuthService'
import { jwt as jwtConfig } from '@/config'

const router = Router()
const authService = Container.get(AuthService)
const memberProfileService = Container.get(MemberProfileService)
const memberAvatarUpload = getImageMulter()

export default (app: Router) => {
    app.use('/profile', validateIdentity([
        UserIdentityType.manager,
        UserIdentityType.member
    ]), router)

    router.post(
        '/avatar', 
        memberAvatarUpload.single('file'),
        async (req: Request, res: Response) => {
            const identity = req.user!.identity
            
            if (!req.file)
                return res.status(400).end()

            const member = await memberProfileService.updateAvatar(identity, req.file)

            if (!member) 
                return res.status(400).end()

            req.user!.identity = member
            const token = await authService.refreshUserToken(
                req.user!, 
                req.authToken, 
                req.ip
            )

            return member && token ?
                res.header(jwtConfig.authHeaderName, token).json(member) :
                res.status(400).end()
        }
    )
}