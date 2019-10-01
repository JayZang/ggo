export const GET_ALL_MEMBERS = 'GET_ALL_MEMBERS'

export interface MemberState {
  members: any[]
}

interface GetAllMemberAction {
  type: typeof GET_ALL_MEMBERS,
  payload: {
    members: any[]
  }
}

export type MemberActionTypes = GetAllMemberAction