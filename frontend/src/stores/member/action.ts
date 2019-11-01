import { Dispatch } from 'redux'

import * as memberAPI from 'api/member'
import { regularizeMemberData } from './utils'
import {
    GET_ALL_MEMBERS,
    CLEAR_MEMBERS,
    ADD_MEMBER,
    UPDATE_MEMBER,
    REMOVE_MEMBER,
    MemberActionTypes,
    GET_MEMBER_BASE_INFO,
    CLEAR_MEMBER_INFO,
    GET_MEMBER_EMERGENCT_CONTACT,
    ADD_EMERGENCY_CONTACT,
    REMOVE_EMERGENCY_CONTACT,
} from './types'
import { IEmergencyContactEditDTO } from 'contracts/member'

export const fetchMembers = () => async (dispatch: Dispatch) => {
    const res = await memberAPI.all()

    const action: MemberActionTypes = {
        type: GET_ALL_MEMBERS,
        payload: {
            members: res.data.map(member => {
                return regularizeMemberData(member)
            })
        }
    }

    dispatch(action)
}

export function clearMembers(): MemberActionTypes {
    return {
        type: CLEAR_MEMBERS
    }
}

export const createMember = (data: any) => async (dispatch: Dispatch) => {
    const res = await memberAPI.create(data)

    const action: MemberActionTypes = {
        type: ADD_MEMBER,
        payload: {
            member: regularizeMemberData(res.data)
        }
    }

    dispatch(action)
}

export const updateMember = (id: number | string, data: any) => async (dispatch: Dispatch) => {
    const res = await memberAPI.update(id, data)

    const action: MemberActionTypes = {
        type: UPDATE_MEMBER,
        payload: {
            member: regularizeMemberData(res.data)
        }
    }

    dispatch(action)
}

export const removeMember = (id: number | string) => async (dispatch: Dispatch) => {
    await memberAPI.remove(id)

    const action: MemberActionTypes = {
        type: REMOVE_MEMBER,
        payload: {
            id
        }
    }

    dispatch(action)
}

export const getMemberBaseInfo = (id: number | string) => async (dispatch: Dispatch) => {
    const res = await memberAPI.getBaseInfo(id)

    const action: MemberActionTypes = {
        type: GET_MEMBER_BASE_INFO,
        payload: {
            member: regularizeMemberData(res.data)
        }
    }

    dispatch(action)
}

export const getMemberEmergencyContacts = (id: number | string) => async (dispatch: Dispatch) => {
    const res = await memberAPI.getEmergencyContacts(id)

    const action: MemberActionTypes = {
        type: GET_MEMBER_EMERGENCT_CONTACT,
        payload: {
            emergencyContacts: res.data
        }
    }

    dispatch(action)
}

export const createEmergencyContact = (id: number | string, data: IEmergencyContactEditDTO) => async (dispatch: Dispatch) => {
    const res = await memberAPI.createEmergencyContact(id, data)

    const action: MemberActionTypes = {
        type: ADD_EMERGENCY_CONTACT,
        payload: {
            emergencyContact: res.data
        }
    }

    dispatch(action)
}

export const deleteEmergencyContact = (id: number | string) => async (dispatch: Dispatch) => {
    await memberAPI.deleteEmergencyContact(id)

    const action: MemberActionTypes = {
        type: REMOVE_EMERGENCY_CONTACT,
        payload: {
            id
        }
    }

    dispatch(action)
}

export const clearMemberInfo = () => {
    return {
        type: CLEAR_MEMBER_INFO
    }
}