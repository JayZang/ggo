import { Dispatch } from "redux";

import * as iamApi from 'api/iam'
import { IAMActionTypes, GET_POLICIES, GET_GROUPS, ADD_GROUP, DELETE_GROUP, UPDATE_GROUP, GET_USERS, CONFIG_USER_LOGINABLE, UPDATE_USER_POLICIES } from "./types";
import { regularizePolicyData, regularizeGroupData, regularizeUserData } from "./utils";

export const getPolicies = () => async (dispatch: Dispatch) => {
    const res = await iamApi.getPolicies()

    const action: IAMActionTypes = {
        type: GET_POLICIES,
        payload: {
            policies: res.data.map(policy => regularizePolicyData(policy))
        }
    }

    dispatch(action)
}

export const getGroups = () => async (dispatch: Dispatch) => {
    const res = await iamApi.getGroups()

    const action: IAMActionTypes = {
        type: GET_GROUPS,
        payload: {
            groups: res.data.map(group => regularizeGroupData(group))
        }
    }

    dispatch(action)
}

export const createGroup = (data: any) => async (dispatch: Dispatch) => {
    const res = await iamApi.createGroup(data)

    const action: IAMActionTypes = {
        type: ADD_GROUP,
        payload: {
            group: regularizeGroupData(res.data)
        }
    }

    dispatch(action)
}

export const updateGroup = (id: string | number, data: any) => async (dispatch: Dispatch) => {
    const res = await iamApi.updateGroup(id, data)

    const action: IAMActionTypes = {
        type: UPDATE_GROUP,
        payload: {
            group: regularizeGroupData(res.data)
        }
    }

    dispatch(action)
}

export const deleteGroup = (ids: string[] | number[]) => async (dispatch: Dispatch) => {
    await iamApi.deleteGroup(ids)

    const action: IAMActionTypes = {
        type: DELETE_GROUP,
        payload: {
            ids
        }
    }

    dispatch(action)
}

export const getUsers = () => async (dispatch: Dispatch) => {
    const res = await iamApi.getUsers()

    const action: IAMActionTypes = {
        type: GET_USERS,
        payload: {
            users: res.data.users.map(user => regularizeUserData(user))
        }
    }

    dispatch(action)
}

export const configUserLoginable = (id: string | number, loginable: boolean) => async (dispatch: Dispatch) => {
    await iamApi.setUserLoginable(id, loginable)

    const action: IAMActionTypes = {
        type: CONFIG_USER_LOGINABLE,
        payload: {
            id,
            loginable
        }
    }

    dispatch(action)
}

export const updateUserPolicies = (id: string | number, data: {
    policyIds: string[] | number[]
    groupIds: string[] | number[]
}) => async (dispatch: Dispatch) => {
    const res = await iamApi.updateUserPolicies(id, data)

    const action: IAMActionTypes = {
        type: UPDATE_USER_POLICIES,
        payload: {
            user: regularizeUserData(res.data)
        }
    }

    dispatch(action)
}