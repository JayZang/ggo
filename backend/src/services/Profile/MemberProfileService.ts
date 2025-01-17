import { getCustomRepository } from 'typeorm'
import { Service } from 'typedi'

import Member from '@/entity/Member'
import MemberRepo from '@/repository/MemberRepository'
import { resource } from '@/config'

import storeFileWithRandomName from '@/utils/storeFileWithRandomName'

@Service()
export default class MemberProfileService {

    /**
     * Update member avatar
     */
    public async updateAvatar(member: Member, file: Express.Multer.File) {
        try {
            const memberRepo = getCustomRepository(MemberRepo)
            return await memberRepo.updateById(member.id, {
                avatar: await storeFileWithRandomName(file, resource.memberAvatar.dest)
            })
        } catch (err) {
            console.log('Update member avatar error')
            console.log(err.toString())
            return null
        }
    }
}