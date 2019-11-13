import mement from 'moment'

import { ITeam } from 'contracts/team'
import { regularizeMemberData } from 'stores/member/utils'

export function regularizeTeamData(data: any): ITeam {
    return {
        ...data,
        create_at: mement(data.create_at),
        leader: regularizeMemberData(data.leader)
    }
}