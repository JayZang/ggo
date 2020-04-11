import { Moment } from 'moment'
import { ITask } from 'contracts/task'
import { IProject } from 'contracts/project'
import { ICustomer } from 'contracts/customer'

export const GET_PROJECTS = 'GET_PROJECTS'
export const ADD_PROJECT = 'ADD_PROJECT'
export const UPDATE_PROJECT = 'UPDATE_PROJECT'
export const UPDATE_PROJECT_FINISH_DATE = 'UPDATE_PROJECT_FINISH_DATE'
export const CLEAR_LIST_PAGE_STATE = 'CLEAR_LIST_PAGE_STATE'
export const GET_PROJECT_COUNT_STATISTIC = 'GET_PROJECT_COUNT_STATISTIC'
export const GET_PROJECT_DETAIL_INFO = 'GET_PROJECT_DETAIL_INFO'
export const GET_CUSTOMER_SELECTION_MENU = 'GET_CUSTOMER_SELECTION_MENU'

export type ProjectState = {
    listPage: {
        projects: IProject[] | null
        totalCount: number
        srcTypeInternalCount: number
        srcTypeCustomerCount: number
    }

    infoPage: {
        project: IProject | null
        tasks: ITask[] | null
    }

    editPanel: {
        customerSelectionMenu: ICustomer[] | null
    }
}

type GetProjects = {
    type: typeof GET_PROJECTS,
    payload: {
        projects: IProject[]
    }
}

type AddProject = {
    type: typeof ADD_PROJECT,
    payload: {
        project: IProject
    }
}

type UpdateProject = {
    type: typeof UPDATE_PROJECT,
    payload: {
        project: IProject
    }
}

type UpdateProjectFinishDate = {
    type: typeof UPDATE_PROJECT_FINISH_DATE,
    payload: {
        projectId: string | number,
        date: Moment
    }
}

type ClearListPageState = {
    type: typeof CLEAR_LIST_PAGE_STATE,
}

type GetCustomerSelectionMenu = {
    type: typeof GET_CUSTOMER_SELECTION_MENU,
    payload: {
        customers: ICustomer[]
    }
}

type GetCountStatistic = {
    type: typeof GET_PROJECT_COUNT_STATISTIC,
    payload: {
        totalCount: number
        srcTypeInternalCount: number
        srcTypeCustomerCount: number
    }
}

type GetProjectDetailInfo = {
    type: typeof GET_PROJECT_DETAIL_INFO,
    payload: {
        project: IProject
        tasks: ITask[]
    }
}

export type ProjectActionType = 
    GetProjects |
    AddProject |
    UpdateProject |
    UpdateProjectFinishDate |
    ClearListPageState |
    GetCountStatistic |
    GetProjectDetailInfo |
    GetCustomerSelectionMenu