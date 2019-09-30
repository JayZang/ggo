export interface IMember {
  _id: String
  
  name: String

  gender: Boolean

  phone: String

  email: String

  birthday: Date

  avatar?: String

  status: MemberStatus

  createdAt: Date

  updateAt: Date
}

export enum MemberStatus {
  inactive = 0,
  active = 1
}