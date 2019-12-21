import { IProject } from 'contracts/project'
import { ICustomer } from 'contracts/customer'

export const ADD_PROJECTS = 'ADD_PROJECTS'
export const UPDATE_PROJECT = 'UPDATE_PROJECT'
export const CLEAR_PROJECT = 'CLEAR_PROJECT'
export const GET_CUSTOMER_SELECTION_MENU = 'GET_CUSTOMER_SELECTION_MENU'
export const GET_COUNT_STATISTIC = 'GET_COUNT_STATISTIC'
export const GET_PROJECT_BASE_INFO = 'GET_PROJECT_BASE_INFO'

export type ProjectState = {
    projectMenu: IProject[] | null
    customerSelectionMenu: ICustomer[] | null
    statistics: {
        totalCount: number
        srcTypeInternalCount: number
        srcTypeCustomerCount: number
    },
    projectDetail: {
        baseInfo: IProject | null
    }
}

type AddProjects = {
    type: typeof ADD_PROJECTS,
    payload: {
        projects: IProject[]
        prepend?: boolean
    }
}

type UpdateProject = {
    type: typeof UPDATE_PROJECT,
    payload: {
        project: IProject
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

type GetProjectBaseInfo = {
    type: typeof GET_PROJECT_BASE_INFO,
    payload: {
        project: IProject
    }
}

export type ProjectActionType = 
    AddProjects |
    UpdateProject |
    ClearProject |
    GetCustomerSelectionMenu |
    GetCountStatistic |
    GetProjectBaseInfo