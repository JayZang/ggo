import { Moment } from 'moment'
import { ITeam } from './team'

export type IMember = {
    id: number
    name: string
    gender: MemberGender
    phone: string
    email: string
    birthday: Moment
    avatar: string
    take_office_date: Moment
    leave_office_date: Moment | null
    status: MemberStatus
    isUser?: boolean
    create_at: Moment
    update_at: Moment
    teams?: ITeam[]
    teams_as_leader?: ITeam[]
    emergencyContacts?: IEmergencyContact[]
}

export enum MemberStatus {
    inactive = 0,
    active = 1
}

export enum MemberGender {
    female = 0,
    male = 1,
    other = 2
}

export type IEmergencyContact = {
    id: number
    member_id: number
    name: string
    relationship: string
    phone: string
}

export type IEmergencyContactEditDTO = Pick<IEmergencyContact, 'name' | 'phone' | 'relationship'>