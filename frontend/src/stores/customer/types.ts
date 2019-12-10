import { ICustomer } from 'contracts/customer'

export const ADD_CUSTOMER = 'ADD_CUSTOMER'
export const GET_CUSTOMERS = 'GET_CUSTOMERS'

export type CustomerState = {
    customerMenu: ICustomer[] | null
}

type AddCustomer = {
    type: typeof ADD_CUSTOMER,
    payload: {
        customer: ICustomer
    }
}

type GetCustomers = {
    type: typeof GET_CUSTOMERS,
    payload: {
        customers: ICustomer[]
    }
}

export type CustomerActionType = 
    AddCustomer |
    GetCustomers