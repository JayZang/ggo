import { IProject } from 'contracts/project'
import { ICustomer } from 'contracts/customer'

export const ADD_PROJECTS = 'ADD_PROJECTS'
export const CLEAR_PROJECT = 'CLEAR_PROJECT'
export const GET_CUSTOMER_SELECTION_MENU = 'GET_CUSTOMER_SELECTION_MENU'
export const GET_COUNT_STATISTIC = 'GET_COUNT_STATISTIC'

export type ProjectState = {
    projectMenu: IProject[] | null
    customerSelectionMenu: ICustomer[] | null
    statistics: {
        totalCount: number
        srcTypeInternalCount: number
        srcTypeCustomerCount: number
    }
}

type AddProjects = {
    type: typeof ADD_PROJECTS,
    payload: {
        projects: IProject[]
        prepend?: boolean
    }
}

type ClearProject = {
    type: typeof CLEAR_PROJECT,
}

type GetCustomerSelectionMenu = {
    type: typeof GET_CUSTOMER_SELECTION_MENU,
    payload: {
        customers: ICustomer[]
    }
}

type GetCountStatistic = {
    type: typeof GET_COUNT_STATISTIC,
    payload: {
        totalCount: number
        srcTypeInternalCount: number
        srcTypeCustomerCount: number
    }
}

export type ProjectActionType = 
    AddProjects |
    ClearProject |
    GetCustomerSelectionMenu |
    GetCountStatistic