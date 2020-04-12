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
    groups?: IGroup[]
    policies?: IPolicy[]
    identity?: IMember
    permissions?: Permissions
}

export enum UserIdentityType {
    admin = 0,
    manager = 1,
    member = 2,
    customer = 3,
    outsourcing = 4
}

export type Permissions = Record<PermissionsList, boolean | undefined>

type PermissionsList =
    'member_management' |
    'team_management' |
    'customer_management' |
    'project_management'
