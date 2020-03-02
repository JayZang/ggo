import { Moment } from "moment";
import { IPolicy } from "./policy";
import { IGroup } from "./group";
import { IMember } from "./member";

export type IUser = {
    id: number | string
    account_id: string
    line_id: string | null
    loginable: boolean
    identity_type: UserIdentityType
    identity_id: string | number
    create_at: Moment
    update_at: Moment
    last_login_datetime: Moment | null
    groups: IGroup[]
    policies: IPolicy[]
    identity?: IMember
}

export enum UserIdentityType {
    admin = 0,
    member = 1,
    customer = 2,
    outsourcing = 3
}