import mement from 'moment'

import { ITeam, TeamStatus } from 'contracts/team'
import { regularizeMemberData } from 'stores/member/utils'

export function regularizeTeamData(data: any): ITeam {
    return {
        ...data,
        create_at: mement(data.create_at),
        leader: data.leader && regularizeMemberData(data.leader),
        status_name: data.status === TeamStatus.active ? '啟用中' : '停用中'
    }
}