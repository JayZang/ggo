import mement from 'moment'

import { ITeam, TeamStatus } from 'contracts/team'
import { regularizeMemberData } from 'stores/utils/regularizeMemberData'

export function regularizeTeamData(data: any): ITeam {
    return {
        ...data,
        create_at: mement(data.create_at),
        leader: data.leader && regularizeMemberData(data.leader),
        members: data.members && data.members.map((member: any) => regularizeMemberData(member)),
        status_name: data.status === TeamStatus.active ? '啟用中' : '停用中'
    }
}