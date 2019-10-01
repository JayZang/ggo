import { Moment } from 'moment'

export type IMember = {
  _id: string
  name: string
  gender: Boolean
  phone: string
  email: string
  birthday: Moment
  avatar?: string
  status: MemberStatus
  createdAt: Moment
  updateAt: Moment
}

export enum MemberStatus {
  inactive = 0,
  active = 1
}