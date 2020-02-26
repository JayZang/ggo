import { IPolicy } from "contracts/policy";
import { IGroup } from "contracts/group";

export const GET_POLICIES = 'GET_POLICIES'
export const GET_GROUPS = 'GET_GROUPS'
export const ADD_GROUP = 'ADD_GROUP'
export const DELETE_GROUP = 'DELETE_GROUP'

export type IAMState = {
    policies: IPolicy[] | null,
    groups: IGroup[] | null
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

type DeleteGroup = {
    type: typeof DELETE_GROUP,
    payload: {
        ids: string[] | number[]
    }
}

export type IAMActionTypes = 
    GetPolicies |
    GetGroups |
    AddGroup |
    DeleteGroup