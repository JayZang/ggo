import { IMember } from 'contracts/member'

export const GET_ALL_MEMBERS = 'GET_ALL_MEMBERS'
export const CLEAR_MEMBERS = 'CLEAR_MEMBERS'

export interface MemberState {
  members: IMember[]
}

interface GetAllMemberAction {
  type: typeof GET_ALL_MEMBERS,
  payload: {
    members: IMember[]
  }
}

interface ClearMembers {
  type: typeof CLEAR_MEMBERS
}

export type MemberActionTypes = GetAllMemberAction | ClearMembers