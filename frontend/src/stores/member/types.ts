import { IMember, IEmergencyContact } from 'contracts/member'

export const CLEAR_MEMBERS = 'CLEAR_MEMBERS'
export const GET_MEMBER_COUNT_STATISTIC = 'GET_MEMBER_COUNT_STATISTIC'
export const ADD_MEMBER_LIST = 'ADD_MEMBER_LIST'
export const UPDATE_MEMBER = 'UPDATE_MEMBER'
export const REMOVE_MEMBER = 'REMOVE_MEMBER'
export const GET_MEMBER_BASE_INFO = 'GET_MEMBER_BASE_INFO'
export const GET_MEMBER_EMERGENCY_CONTACT = 'GET_MEMBER_EMERGENCY_CONTACT'
export const ADD_EMERGENCY_CONTACT = 'ADD_EMERGENCY_CONTACT'
export const REMOVE_EMERGENCY_CONTACT = 'REMOVE_EMERGENCY_CONTACT'
export const CLEAR_MEMBER_INFO = 'CLEAR_MEMBER_INFO'
export const GET_TEAM_MEMBERS = 'GET_TEAM_MEMBERS'

export type MemberState = {
    /**
     * Member list
     */
    members: {
        list: IMember[] | null,
        totalCount: number,
        activeCount: number,
        inactiveCount: number
    },

    /**
     * Member Detail Information
     */
    memberInfo: {
        baseInfo: IMember | null,
        emergenctContacts: IEmergencyContact[] | null
    },

    teamMembers: IMember[] | null,
}

type ClearMembers  = {
    type: typeof CLEAR_MEMBERS
}

type GetMemberCountStatistic = {
    type: typeof GET_MEMBER_COUNT_STATISTIC,
    payload: {
        totalCount: number
        activeCount: number
        inactiveCount: number
    }
}

type AddMemberList = {
    type: typeof ADD_MEMBER_LIST,
    payload: {
        members: IMember[]
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
    type: typeof GET_MEMBER_EMERGENCY_CONTACT,
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

type GetTeamMembers = {
    type: typeof GET_TEAM_MEMBERS,
    payload: {
        members: IMember[]
    }
}

export type MemberActionTypes = 
    GetMemberCountStatistic |
    AddMemberList | 
    ClearMembers | 
    UpdateMember | 
    RemoveMember |
    GetMemberBaseInfo |
    GetEmergencyContacts |
    AddEmergencyContact |
    RemoveEmergencyContact |
    ClearMemberInfo | 
    GetTeamMembers