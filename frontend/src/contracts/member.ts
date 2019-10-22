import { Moment } from 'moment'

export type IMember = {
  id: number
  name: string
  gender: MemberGender
  phone: string
  email: string
  birthday: Moment
  avatar: string | null
  take_office_date: Moment 
  leave_office_date: Moment | null
  status: MemberStatus
  create_at: Moment
  update_at: Moment
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