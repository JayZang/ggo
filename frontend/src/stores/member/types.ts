import { IMember, IEmergencyContact } from 'contracts/member'

export const GET_ALL_MEMBERS = 'GET_ALL_MEMBERS'
export const CLEAR_MEMBERS      = 'CLEAR_MEMBERS'
export const ADD_MEMBER             = 'ADD_MEMBER'
export const UPDATE_MEMBER     = 'UPDATE_MEMBER'
export const REMOVE_MEMBER    = 'REMOVE_MEMBER'
export const GET_MEMBER_BASE_INFO = 'GET_MEMBER_BASE_INFO'
export const GET_MEMBER_EMERGENCT_CONTACT = 'GET_MEMBER_EMERGENCT_CONTACT'
export const ADD_EMERGENCY_CONTACT = 'ADD_EMERGENCY_CONTACT'
export const REMOVE_EMERGENCY_CONTACT = 'REMOVE_EMERGENCY_CONTACT'
export const CLEAR_MEMBER_INFO = 'CLEAR_MEMBER_INFO'

export type MemberState = {
    /**
     * Member list
     */
    members: IMember[],

    /**
     * Member Detail Information
     */
    memberInfo: {
        baseInfo: IMember | null,
        emergenctContacts: IEmergencyContact[] | null
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

type GetEmergencyContacts = {
    type: typeof GET_MEMBER_EMERGENCT_CONTACT,
    payload: {
        emergencyContacts: IEmergencyContact[]
    }
}

type AddEmergencyContact = {
    type: typeof ADD_EMERGENCY_CONTACT,
    payload: {
        emergencyContact: IEmergencyContact
    }
}

type RemoveEmergencyContact = {
    type: typeof REMOVE_EMERGENCY_CONTACT,
    payload: {
        id: number | string
    }
}

type ClearMemberInfo = {
    type: typeof CLEAR_MEMBER_INFO
}

export type MemberActionTypes = 
    GetAllMemberAction | 
    ClearMembers | 
    AddMember | 
    UpdateMember | 
    RemoveMember |
    GetMemberBaseInfo |
    GetEmergencyContacts |
    AddEmergencyContact |
    RemoveEmergencyContact |
    ClearMemberInfo