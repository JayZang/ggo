import { IProject } from 'contracts/project'
import { ICustomer } from 'contracts/customer'

export const ADD_PROJECT = 'ADD_PROJECT'
export const GET_PROJECT = 'GET_PROJECT'
export const CLEAR_PROJECT = 'CLEAR_PROJECT'
export const GET_CUSTOMER_SELECTION_MENU = 'GET_CUSTOMER_SELECTION_MENU'

export type ProjectState = {
    projectMenu: IProject[] | null,
    customerSelectionMenu: ICustomer[] | null
}

type AddProject = {
    type: typeof ADD_PROJECT,
    payload: {
        project: IProject
    }
}

type GetProject = {
    type: typeof GET_PROJECT,
    payload: {
        projects: IProject[]
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

export type ProjectActionType = 
    AddProject |
    GetProject |
    ClearProject |
    GetCustomerSelectionMenu