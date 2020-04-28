import { UserIdentityType } from "@/entity/User";

export class UserHelper {
    static identitiesForMember = [
        UserIdentityType.manager,
        UserIdentityType.member,
    ]

    static isIdentityForMember(identity: UserIdentityType) {
        return this.identitiesForMember.includes(identity)
    }
}