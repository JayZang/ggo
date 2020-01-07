import { Moment } from "moment";
import { IProject } from "./project";
import { IMember } from "./member";
import { ITeam } from "./team";

export  type ITask = {
    id: number | string
    name: string
    description: string | null
    start_datetime: Moment
    deadline_datetime: Moment
    finish_datetime: Moment | null
    status: TaskStatus
    project_id: number
    project?: IProject | null
    create_at: Moment,
    assignment: ITaskAssignment,
    statusLabel: string
}

export type ITaskAssignment = {
    id: number | string
    task_id: number | string
    target_id: number | string
    distributor_id: number | string
    type: TaskAssignType,
    distributor: IMember,
    target: IMember | ITeam
}

export enum TaskStatus {
    Normal = 0,
    Pause = 1,
    Terminated = 2,
    Completed = 3
}

export enum TaskAssignType {
    Member = 0,
    Team = 1,
    Outsourcing = 2
}