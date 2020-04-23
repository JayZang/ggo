import { Router, Response, Request } from 'express'
import { Container } from 'typedi'

import { UserIdentityType } from '@/entity/User'
import validateIdentity from '@/api/middleware/validateIdentity'
import MemberProfileService from '@/services/Profile/MemberProfileService'
import getImageMulter from '@/utils/multer/getImageMulter'

const router = Router()
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

            let member = await memberProfileService.updateAvatar(identity, req.file)

            return member ?
                res.json(member) :
                res.status(400).end()
        }
    )
}