import { Moment } from "moment";

export  type IPolicy = {
    id: number | string
    name: string
    description: string | null
    variable_name: string
    create_at: Moment
}