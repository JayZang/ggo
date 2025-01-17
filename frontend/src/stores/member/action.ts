import { Dispatch } from 'redux'

import * as memberAPI from 'api/member'
import { regularizeMemberData } from 'stores/utils/regularizeMemberData'
import {
    CLEAR_MEMBERS,
    UPDATE_MEMBER,
    REMOVE_MEMBER,
    MemberActionTypes,
    GET_MEMBER_DETAIL_INFO,
    ADD_EMERGENCY_CONTACT,
    REMOVE_EMERGENCY_CONTACT,
    GET_MEMBER_COUNT_STATISTIC,
    GET_MEMBER_LIST,
    ADD_MEMBER_TO_LIST,
    UPDATE_MEMBER_STATUS,
    SET_MEMBER_LIST_FILTER,
} from './types'
import { IEmergencyContactEditDTO, MemberStatus, IMember } from 'contracts/member'
import { RootState } from 'stores'

export const fetchMemberCountStatistic = () => async (dispatch: Dispatch, getState: () => RootState) => {
    const listFilter = getState().member.listPage.filter
    const res = await memberAPI.getCountStatistic(listFilter)

    const action: MemberActionTypes = {
        type: GET_MEMBER_COUNT_STATISTIC,
        payload: {
            totalCount: res.data.total,
            activeCount: res.data.active,
            inactiveCount: res.data.inactive
        }
    }

    dispatch(action)
}

export const fetchMembers = () => async (dispatch: Dispatch, getState: () => RootState) => {
    const {
        list: memberList,
        totalCount,
        filter: listFilter
    } = getState().member.listPage

    if (memberList && memberList.length >= totalCount)
        return

    const res = await memberAPI.get({
        ...listFilter,
        offset: memberList ? memberList.length : 0,
        count: 10
    })

    const action: MemberActionTypes = {
        type: GET_MEMBER_LIST,
        payload: {
            members: res.data.map(member => regularizeMemberData(member))
        }
    }

    dispatch(action)
}

export function setListFilter(
    parameters: Partial<Record<keyof IMember, any>>
): MemberActionTypes {
    return {
        type: SET_MEMBER_LIST_FILTER,
        payload: {
            name: parameters.name
        }
    }
}

export function clearMembers(): MemberActionTypes {
    return {
        type: CLEAR_MEMBERS
    }
}

export const createMember = (data: any) => async (dispatch: Dispatch, getState: () => RootState) => {
    const res = await memberAPI.create(data)

    const action: MemberActionTypes = {
        type: ADD_MEMBER_TO_LIST,
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

export const updateMemberStatus = (id: number | string, status: MemberStatus) => async (dispatch: Dispatch) => {
    await memberAPI.updateStatus(id, status)

    const action: MemberActionTypes = {
        type: UPDATE_MEMBER_STATUS,
        payload: {
            id,
            status
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

export const fetchMemberDetailInfo = (id: number | string) => async (dispatch: Dispatch) => {
    const res = await memberAPI.getBaseInfo(id)

    const member = regularizeMemberData(res.data)
    const action: MemberActionTypes = {
        type: GET_MEMBER_DETAIL_INFO,
        payload: {
            member,
            emergencyContacts: member.emergencyContacts || [],
            teams: [
                ...(member.teams_as_leader || []),
                ...(member.teams || [])
            ]
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