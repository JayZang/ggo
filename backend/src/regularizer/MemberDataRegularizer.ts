import { resource } from '@/config'
import Member from "@/entity/Member";

export default class MemberDataRegularizer {
    static regularize(member: Member) {
        member.avatar = member.avatar && `/${resource.memberAvatar.dest}${member.avatar}`
    }
}