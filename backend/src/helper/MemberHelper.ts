import { getCustomRepository } from "typeorm";

import Member from "@/entity/Member";
import { UserIdentityType } from "@/entity/User";
import UserRepo from "@/repository/UserRepository";

export default class MemberHelper {
    static async attachIsUserField(members: Member[]) {
        const userRepo = getCustomRepository(UserRepo)
        const memberIdsMapping: Member[] = []

        if (members.length === 0)
            return members

        members.forEach(member => {
            memberIdsMapping[member.id] = member
        })

        // In normal, a member's identity only will be manager or member
        const memberIds = Object.keys(memberIdsMapping) as any[]
        const [usersAsManager, usersAsMember] = await Promise.all([
            userRepo.getByIdentities(UserIdentityType.manager, memberIds),
            userRepo.getByIdentities(UserIdentityType.member, memberIds)
        ])
        const users = [...usersAsManager, ...usersAsMember]

        users.forEach(user => {
            memberIdsMapping[user.identity_id].isUser = true
        })

        return members
    }
}