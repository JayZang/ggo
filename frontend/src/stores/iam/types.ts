import { IPolicy } from "contracts/policy";
import { IGroup } from "contracts/group";
import { IUser } from "contracts/user";

export const GET_POLICIES = 'GET_POLICIES'
export const GET_GROUPS = 'GET_GROUPS'
export const ADD_GROUP = 'ADD_GROUP'
export const UPDATE_GROUP = 'UPDATE_GROUP'
export const DELETE_GROUP = 'DELETE_GROUP'
export const GET_USERS = 'GET_USERS'
export const CONFIG_USER_LOGINABLE = 'CONFIG_USER_LOGINABLE'
export const UPDATE_USER_POLICIES = 'UPDATE_USER_POLICIES'
export const DELETE_USERS = 'DELETE_USERS'

export type IAMState = {
    policies: IPolicy[] | null
    groups: IGroup[] | null
    users: IUser[] | null
}

type GetPolicies = {
    type: typeof GET_POLICIES,
    payload: {
        policies: IPolicy[]
    }
}

type GetGroups = {
    type: typeof GET_GROUPS,
    payload: {
        groups: IGroup[]
    }
}

type AddGroup = {
    type: typeof ADD_GROUP,
    payload: {
        group: IGroup
    }
}

type UpdateGroup = {
    type: typeof UPDATE_GROUP,
    payload: {
        group: IGroup
    }
}

type DeleteGroup = {
    type: typeof DELETE_GROUP,
    payload: {
        ids: string[] | number[]
    }
}

type GetUsers = {
    type: typeof GET_USERS,
    payload: {
        users: IUser[]
    }
}

type ConfigUserLoginable = {
    type: typeof CONFIG_USER_LOGINABLE,
    payload: {
        id: string | number
        loginable: boolean
    }
}

type UpdateUserPolicies = {
    type: typeof UPDATE_USER_POLICIES,
    payload: {
        user: IUser
    }
}

type DeleteUsers = {
    type: typeof DELETE_USERS,
    payload: {
        ids: string[] | number[]
    }
}

export type IAMActionTypes = 
    GetPolicies |
    GetGroups |
    AddGroup |
    UpdateGroup |
    DeleteGroup |
    GetUsers |
    ConfigUserLoginable |
    UpdateUserPolicies |
    DeleteUsers