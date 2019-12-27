import { Moment } from "moment";
import { IProject } from "./project";

export  type ITask = {
    id: number | string
    name: string
    description: string | null
    start_datetime: Moment
    deadline_datetime: Moment
    finish_datetime: Moment | null
    status: number
    project_id: number
    project?: IProject | null
    create_at: Moment
}