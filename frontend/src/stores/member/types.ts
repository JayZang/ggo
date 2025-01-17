import { IMember, IEmergencyContact, MemberStatus } from 'contracts/member'
import { ITeam } from 'contracts/team'

export const GET_MEMBER_COUNT_STATISTIC = 'GET_MEMBER_COUNT_STATISTIC'
export const GET_MEMBER_LIST = 'GET_MEMBER_LIST'
export const SET_MEMBER_LIST_FILTER = 'SET_MEMBER_LIST_FILTER'
export const ADD_MEMBER_TO_LIST = 'ADD_MEMBER_TO_LIST'
export const CLEAR_MEMBERS = 'CLEAR_MEMBERS'
export const UPDATE_MEMBER = 'UPDATE_MEMBER'
export const UPDATE_MEMBER_STATUS = 'UPDATE_MEMBER_STATUS'
export const REMOVE_MEMBER = 'REMOVE_MEMBER'
export const GET_MEMBER_DETAIL_INFO = 'GET_MEMBER_DETAIL_INFO'
export const ADD_EMERGENCY_CONTACT = 'ADD_EMERGENCY_CONTACT'
export const REMOVE_EMERGENCY_CONTACT = 'REMOVE_EMERGENCY_CONTACT'

export type MemberState = {
    /**
     * Member list page
     */
    listPage: {
        list: IMember[] | null
        totalCount: number
        activeCount: number
        inactiveCount: number
        filter: {
            name: string | undefined
        }
    },

    /**
     * Member detail information page
     */
    infoPage: {
        member: IMember | null
        emergencyContacts: IEmergencyContact[] | null
        teams: ITeam[] | null
    }
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

type GetMemberList = {
    type: typeof GET_MEMBER_LIST,
    payload: {
        members: IMember[]
    }
}

type SetListFilter = {
    type: typeof SET_MEMBER_LIST_FILTER,
    payload: {
        name?: string
    }
}

type AddMemberToList = {
    type: typeof ADD_MEMBER_TO_LIST,
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

type UpdateMemberStatus = {
    type: typeof UPDATE_MEMBER_STATUS,
    payload: {
        id: number | string
        status: MemberStatus
    }
}

type RemoveMember = {
    type: typeof REMOVE_MEMBER,
    payload: {
        id: number | string
    }
}

type GetMemberDetailInfo = {
    type: typeof GET_MEMBER_DETAIL_INFO,
    payload: {
        member: IMember
        emergencyContacts: IEmergencyContact[]
        teams: ITeam[]
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

export type MemberActionTypes = 
    GetMemberCountStatistic |
    GetMemberList |
    SetListFilter |
    AddMemberToList | 
    ClearMembers | 
    UpdateMember | 
    UpdateMemberStatus |
    RemoveMember |
    GetMemberDetailInfo |
    AddEmergencyContact |
    RemoveEmergencyContact