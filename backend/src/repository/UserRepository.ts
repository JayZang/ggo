import { EntityRepository, getCustomRepository, In } from 'typeorm'
import _ from 'lodash'

import User, { UserIdentityType } from '@/entity/User'
import MemberRepo from './MemberRepository'
import { BaseRepository } from './BaseRepocitory'

@EntityRepository(User)
class UserRepository extends BaseRepository<User> {

    public async getByIdentities(type: UserIdentityType, ids: number[]) {
        return this.find({
            identity_type: type,
            identity_id: In(ids)
        })
    }

    public async attachIdentity(users: User[]): Promise< User[]> {
        const memberRepo = getCustomRepository(MemberRepo)
        const memberMapping: User[] = []

        users.forEach(user => {
            let mapping = undefined

            switch (user.identity_type) {
                case UserIdentityType.manager:
                case UserIdentityType.member:
                    mapping = memberMapping
                    break
                
                default:
                    return
            }

            mapping[user.identity_id] = user
        })

        const [
            members
        ] = await Promise.all([
            memberRepo.findByIds(Object.keys(memberMapping))
        ])

        members.forEach(member => {
            const user = memberMapping[member.id as any]
            if (!user) return
            user.identity = member
        })

        return users
    }

    public async removeByIdentity(type: UserIdentityType, id: number) {
        const user = await this.findOne({
            identity_type: type,
            identity_id: id
        })

        if (user)
            await this.remove(user)

        return user
    }
}

export default UserRepository