import { IMember } from 'contracts/member'

export const GET_ALL_MEMBERS = 'GET_ALL_MEMBERS'
export const CLEAR_MEMBERS      = 'CLEAR_MEMBERS'
export const ADD_MEMBER             = 'ADD_MEMBER'
export const UPDATE_MEMBER     = 'UPDATE_MEMBER'
export const REMOVE_MEMBER    = 'REMOVE_MEMBER'
export const GET_MEMBER_BASE_INFO = 'GET_MEMBER_BASE_INFO'

export type MemberState = {
    /**
     * Member list
     */
    members: IMember[],

    /**
     * Member Detail Information
     */
    memberInfo: {
        baseInfo: IMember | null
    }
}

type GetAllMemberAction = {
    type: typeof GET_ALL_MEMBERS,
    payload: {
        members: IMember[]
    }
}

type ClearMembers  = {
    type: typeof CLEAR_MEMBERS
}

type AddMember = {
    type: typeof ADD_MEMBER,
    payload: {
        member: IMember
    }
}

type UpdateMember = {
    type: typeof UPDATE_MEMBER,
    payload: {
        member: IMember
    }
}

type RemoveMember = {
    type: typeof REMOVE_MEMBER,
    payload: {
        id: number | string
    }
}

type GetMemberBaseInfo = {
    type: typeof GET_MEMBER_BASE_INFO,
    payload: {
        member: IMember
    }
}

export type MemberActionTypes = 
    GetAllMemberAction | 
    ClearMembers | 
    AddMember | 
    UpdateMember | 
    RemoveMember |
    GetMemberBaseInfo