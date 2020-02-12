import { Moment } from "moment";

import { IMember } from 'contracts/member'
import { ITaskAssignment } from "./task";

export enum TeamStatus {
    inactive = 0,
    active = 1
}

export type ITeam = {
    id: number | string,
    name: string,
    description: string,
    is_temporary: boolean,
    status: TeamStatus,
    leader_id: number | string,
    create_at: Moment,
    members_count: number
    leader?: IMember,
    task_assignments?: ITaskAssignment[],
    status_name: string
}