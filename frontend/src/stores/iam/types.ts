import { IPolicy } from "contracts/policy";
import { IGroup } from "contracts/group";
import { IUser } from "contracts/user";

export const GET_POLICIES = 'GET_POLICIES'
export const GET_GROUPS = 'GET_GROUPS'
export const GET_USERS = 'GET_USERS'
export const ADD_GROUP = 'ADD_GROUP'
export const UPDATE_GROUP = 'UPDATE_GROUP'
export const DELETE_GROUP = 'DELETE_GROUP'

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

export type IAMActionTypes = 
    GetPolicies |
    GetGroups |
    AddGroup |
    UpdateGroup |
    DeleteGroup |
    GetUsers