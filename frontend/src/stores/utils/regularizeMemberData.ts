import moment from "moment";

import { IMember, MemberGender } from "contracts/member"
import defaultManAvatar from 'assets/svgs/default-man-avatar.svg'
import defaultWomanAvatar from 'assets/svgs/default-woman-avatar.svg'
import { regularizeTeamData } from "stores/team/utils";

export function regularizeMemberData(data: any): IMember {
    const defaultAvatar = data.gender === MemberGender.female ? defaultWomanAvatar : defaultManAvatar
    
    return {
        ...data,
        avatar: data.avatar || defaultAvatar,
        birthday: moment(data.birthday),
        take_office_date: moment(data.take_office_date),
        leave_office_date: data.leave_office_date !== null ? moment(data.leave_office_date) : null,
        create_at: moment(data.create_at),
        update_at: moment(data.update_at),
        teams: data.teams && data.teams.map((team: any) => regularizeTeamData(team))
    }
}