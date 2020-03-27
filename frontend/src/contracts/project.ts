import { Moment } from "moment";
import { ICustomer } from "./customer";
import { ITask } from "./task";

export enum ProjectSrcType {
    Internal = 0,
    Customer = 1
}

export  type IProject = {
    id: number | string
    name: string
    description: string | null
    start_datetime: Moment
    deadline_datetime: Moment
    finish_datetime: Moment | null
    quote: number | null
    source_type: ProjectSrcType
    customer_id: number | null
    customer: ICustomer | null
    remark: string | null
    create_at: Moment
    tasks?: ITask[]
}