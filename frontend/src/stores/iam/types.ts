import { IPolicy } from "contracts/policy";

export const GET_POLICIES = 'GET_POLICIES'

export type IAMState = {
    policies: IPolicy[] | null
}

type GetPolicies = {
    type: typeof GET_POLICIES,
    payload: {
        policies: IPolicy[]
    }
}

export type IAMActionTypes = 
    GetPolicies