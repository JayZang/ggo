import { Moment } from "moment";
import { ITask } from "./task";
import { IMember } from "./member";

export type IWorkReport = {
    id: number
    title: string
    content: string
    spend_time: string
    start_time: Moment
    end_time: Moment
    submit_from: WorkReportSubmitFrom
    submitter_id: number
    task_id: number
    create_at: Moment
    task?: ITask
    submitter: IMember
}

export enum WorkReportSubmitFrom {
    Web = 0,
    Line = 1
}