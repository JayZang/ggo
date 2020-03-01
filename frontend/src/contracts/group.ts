import { Moment } from "moment";
import { IPolicy } from "./policy";

export  type IGroup = {
    id: number | string
    name: string
    description: string | null
    create_at: Moment,
    policies?: IPolicy[]
}