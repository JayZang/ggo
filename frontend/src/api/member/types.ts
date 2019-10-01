export const GET_ALL_MEMBERS = '/api/members'
export type GetAllMembersResData = [{
  _id: String
  name: String
  gender: Boolean
  phone: String
  email: String
  birthday: Date
  avatar?: String
  status: number
  createdAt: Date
  updateAt: Date
}]
