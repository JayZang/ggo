import { ICustomer, IndustryCategory } from 'contracts/customer'

export const ADD_CUSTOMER = 'ADD_CUSTOMER'
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER'
export const GET_CUSTOMERS = 'GET_CUSTOMERS'
export const REMOVE_CUSTOMER = 'REMOVE_CUSTOMER'
export const GET_CUSTOMER_INDUSTRY_CATEGORIES = 'GET_CUSTOMER_INDUSTRY_CATEGORIES'
export const ADD_CUSTOMER_INDUSTRY_CATEGORY = 'ADD_CUSTOMER_INDUSTRY_CATEGORY'
export const EDIT_CUSTOMER_INDUSTRY_CATEGORY = 'EDIT_CUSTOMER_INDUSTRY_CATEGORY'
export const REMOVE_CUSTOMER_INDUSTRY_CATEGORY = 'REMOVE_CUSTOMER_INDUSTRY_CATEGORY'

export type CustomerState = {
    customerMenu: ICustomer[] | null,

    industryCategories: IndustryCategory[] | null
}

type AddCustomer = {
    type: typeof ADD_CUSTOMER,
    payload: {
        customer: ICustomer
    }
}

type UpdateCustomer = {
    type: typeof UPDATE_CUSTOMER,
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

type RemoveCustomer = {
    type: typeof REMOVE_CUSTOMER,
    payload: {
        id: string | number
    }
}

type GetCustomerIndustryCategories = {
    type: typeof GET_CUSTOMER_INDUSTRY_CATEGORIES,
    payload: {
        industryCategories: IndustryCategory[]
    }
}

type AddCustomerIndustryCategory = {
    type: typeof ADD_CUSTOMER_INDUSTRY_CATEGORY,
    payload: {
        industryCategory: IndustryCategory
    }
}

type EditCustomerIndustryCategory = {
    type: typeof EDIT_CUSTOMER_INDUSTRY_CATEGORY,
    payload: {
        industryCategory: IndustryCategory
    }
}

type RemoveCustomerIndustryCategory = {
    type: typeof REMOVE_CUSTOMER_INDUSTRY_CATEGORY,
    payload: {
        id: number | string
    }
}

export type CustomerActionType = 
    AddCustomer |
    UpdateCustomer |
    GetCustomers |
    RemoveCustomer |
    GetCustomerIndustryCategories |
    AddCustomerIndustryCategory |
    EditCustomerIndustryCategory |
    RemoveCustomerIndustryCategory