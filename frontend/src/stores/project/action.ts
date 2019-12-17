import { Dispatch } from "redux";

import * as projectApi from 'api/project'
import * as customerApi from 'api/customer'
import { ADD_PROJECT, ProjectActionType, GET_PROJECT, GET_CUSTOMER_SELECTION_MENU, CLEAR_PROJECT } from "./types";
import { regularizeProjectData } from "./utils";
import { regularizeCustomerData } from "stores/customer/utils";

export const createProject = (data: any) => async (dispatch : Dispatch) => {
   const res = await projectApi.create(data)

   const action: ProjectActionType = {
        type: ADD_PROJECT,
        payload: {
            project: regularizeProjectData(res.data)
        }
   }

   dispatch(action)
}

export const getProject = () => async (dispatch : Dispatch) => {
   const res = await projectApi.get()

   const action: ProjectActionType = {
        type: GET_PROJECT,
        payload: {
            projects: res.data.map(project => regularizeProjectData(project))
        }
   }

   dispatch(action)
}

export const reloadProject = () => async (dispatch : Dispatch) => {
   dispatch({ type: CLEAR_PROJECT })
   getProject()(dispatch)
}

export const getCustomerSelectionMenu = () => async (dispatch : Dispatch) => {
   const res = await customerApi.get()

   const action: ProjectActionType = {
        type: GET_CUSTOMER_SELECTION_MENU,
        payload: {
            customers: res.data.map(customer => regularizeCustomerData(customer))
        }
   }

   dispatch(action)
}