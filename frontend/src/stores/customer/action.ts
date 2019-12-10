import { Dispatch } from "redux";

import * as customerApi from 'api/customer'
import { CustomerActionType, ADD_CUSTOMER, GET_CUSTOMERS } from "./types";
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