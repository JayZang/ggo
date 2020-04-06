import Member from "@/entity/Member";
import { getCustomRepository } from "typeorm";
import UserRepo from "@/repository/UserRepository";
import { UserIdentityType } from "@/entity/User";

export default class MemberHelper {
    static async attachIsUserField(members: Member[]) {
        const userRepo = getCustomRepository(UserRepo)
        const memberIdsMapping: Member[] = []

        members.forEach(member => {
            memberIdsMapping[member.id] = member
        })

        const users = await userRepo.getByIdentities(
            UserIdentityType.member,
            Object.keys(memberIdsMapping) as any[]
        )

        users.forEach(user => {
            memberIdsMapping[user.identity_id].isUser = !!user
        })

        return members
    }
}