import { Dispatch } from "redux";

import * as customerApi from 'api/customer'
import { CustomerActionType, ADD_CUSTOMER, GET_CUSTOMERS, GET_CUSTOMER_INDUSTRY_CATEGORIES, ADD_CUSTOMER_INDUSTRY_CATEGORY, EDIT_CUSTOMER_INDUSTRY_CATEGORY, REMOVE_CUSTOMER_INDUSTRY_CATEGORY } from "./types";
import { regularizeCustomerData } from "./utils";

export const createCustomer = (data: any) => async (dispatch : Dispatch) => {
   const res = await customerApi.create(data)

   const action: CustomerActionType = {
       type: ADD_CUSTOMER,
       payload: {
           customer: regularizeCustomerData(res.data)
       }
   }

   dispatch(action)
}

export const getCustomers = () => async (dispatch: Dispatch) => {
    const res = await customerApi.get()

    const action: CustomerActionType = {
        type: GET_CUSTOMERS,
        payload: {
            customers: res.data.map(customer => {
                return regularizeCustomerData(customer)
            })
        }
    }

    dispatch(action)
}

export const fetchIndustryCategories = () => async (dispatch: Dispatch) => {
    const res = await customerApi.getIndustryCategories()

    const action: CustomerActionType = {
        type: GET_CUSTOMER_INDUSTRY_CATEGORIES,
        payload: {
            industryCategories: res.data
        }
    }

    dispatch(action)
}

export const createIndustryCategories = (name: string) => async (dispatch: Dispatch) => {
    const res = await customerApi.createIndustryCategories({ name })

    const action: CustomerActionType = {
        type: ADD_CUSTOMER_INDUSTRY_CATEGORY,
        payload: {
            industryCategory: res.data
        }
    }

    dispatch(action)
}

export const updateIndustryCategory = (id: string | number, name: string) => async (dispatch: Dispatch) => {
    const res = await customerApi.updateIndustryCategory(id, { name })

    const action: CustomerActionType = {
        type: EDIT_CUSTOMER_INDUSTRY_CATEGORY,
        payload: {
            industryCategory: res.data
        }
    }

    dispatch(action)
}

export const removeIndustryCategory = (id: string | number) => async (dispatch: Dispatch) => {
    await customerApi.removeIndustryCategory(id)

    const action: CustomerActionType = {
        type: REMOVE_CUSTOMER_INDUSTRY_CATEGORY,
        payload: {
            id
        }
    }

    dispatch(action)
}
