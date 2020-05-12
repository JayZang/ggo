import moment from "moment";

import { ITask } from "contracts/task";
import { IProject } from 'contracts/project'
import { IMember } from "contracts/member";
import { regularizeTeamData } from "./regularizeTeamData";
import { regularizeCustomerData } from "stores/utils/regularizeCustomerData";
import { regularizeMemberData } from "./regularizeMemberData";
import { regularizeTaskData } from "stores/utils/regularizeTaskData";

export function regularizeProjectData(data: any): IProject {
    return {
        ...data,
        start_datetime: moment(data.start_datetime),
        deadline_datetime: moment(data.deadline_datetime),
        finish_datetime: data.finish_datetime ? moment(data.finish_datetime) : null,
        customer: data.customer && regularizeCustomerData(data.customer),
        create_at: moment(data.create_at),
        tasks: data.tasks && data.tasks.map((task: ITask) => regularizeTaskData(task)),
        managers: data.managers && data.managers.map((manager: IMember) => regularizeMemberData(manager)),
        member_participants: data.member_participants && 
            data.member_participants.map((memberParticipant: IMember) => regularizeMemberData(memberParticipant)),
        team_participants: data.team_participants && 
            data.team_participants.map((teamParticipant: IMember) => regularizeTeamData(teamParticipant))
    }
}