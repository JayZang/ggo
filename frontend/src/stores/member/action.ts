import { Dispatch } from 'redux'
import moment from 'moment'

import * as memberAPI from 'api/member'
import {
    GET_ALL_MEMBERS,
    CLEAR_MEMBERS,
    ADD_MEMBER,
    UPDATE_MEMBER,
    REMOVE_MEMBER,
    MemberActionTypes,
} from './types'

export const fetchMembers = () => async (dispatch: Dispatch) => {
    const res = await memberAPI.all()

    const action: MemberActionTypes = {
        type: GET_ALL_MEMBERS,
        payload: {
            members: res.data.map(member => {
                return {
                    ...member,
                    birthday: moment(member.birthday),
                    take_office_date: moment(member.take_office_date),
                    leave_office_date: member.leave_office_date !== null ? moment(member.leave_office_date) : null,
                    create_at: moment(member.create_at),
                    update_at: moment(member.update_at)
                }
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
            member: {
                ...(res.data),
                birthday: moment(res.data.birthday),
                take_office_date: moment(res.data.take_office_date),
                leave_office_date: res.data.leave_office_date !== null ? moment(res.data.leave_office_date) : null,
                create_at: moment(res.data.create_at),
                update_at: moment(res.data.update_at)
            }
        }
    }

    dispatch(action)
}

export const updateMember = (id: number | string, data: any) => async (dispatch: Dispatch) => {
    const res = await memberAPI.update(id, data)

    const action: MemberActionTypes = {
        type: UPDATE_MEMBER,
        payload: {
            member: {
                ...(res.data),
                birthday: moment(res.data.birthday),
                take_office_date: moment(res.data.take_office_date),
                leave_office_date: res.data.leave_office_date !== null ? moment(res.data.leave_office_date) : null,
                create_at: moment(res.data.create_at),
                update_at: moment(res.data.update_at)
            }
        }
    }

    dispatch(action)
}

export const removeMember = (id: number | string) => async (dispatch: Dispatch) => {
    const res = await memberAPI.remove(id)

    const action: MemberActionTypes = {
        type: REMOVE_MEMBER,
        payload: {
            id
        }
    }

    dispatch(action)
}