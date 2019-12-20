import { Dispatch } from "redux";

import * as projectApi from 'api/project'
import * as customerApi from 'api/customer'
import { ADD_PROJECTS, ProjectActionType, GET_CUSTOMER_SELECTION_MENU, CLEAR_PROJECT, GET_COUNT_STATISTIC } from "./types";
import { regularizeProjectData } from "./utils";
import { regularizeCustomerData } from "stores/customer/utils";
import { RootState } from "stores";

export const createProject = (data: any) => async (dispatch : Dispatch) => {
   const res = await projectApi.create(data)

   const action: ProjectActionType = {
        type: ADD_PROJECTS,
        payload: {
            projects: [regularizeProjectData(res.data)],
            prepend: true
        }
   }

   dispatch(action)
}

export const getProject = () => async (dispatch: Dispatch, getState: () => RootState) => {
    const {
        statistics,
        projectMenu
    } = getState().project

    if (projectMenu && projectMenu.length >= statistics.totalCount)
        return

   const res = await projectApi.get({
       offset: projectMenu? projectMenu.length : 0,
       count: 10
   })

   const action: ProjectActionType = {
        type: ADD_PROJECTS,
        payload: {
            projects: res.data.map(project => regularizeProjectData(project))
        }
   }

   dispatch(action)
}

export const reloadProject = () => async (dispatch : Dispatch, getState: () => RootState) => {
   dispatch({ type: CLEAR_PROJECT })
   getProject()(dispatch, getState)
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

export const getCountStatistic = () => async (dispatch: Dispatch) => {
    const res = await projectApi.getCountStatistic()

    const action: ProjectActionType = {
        type: GET_COUNT_STATISTIC,
        payload: {
            totalCount: res.data.totalCount,
            srcTypeInternalCount: res.data.srcTypeInternalCount,
            srcTypeCustomerCount: res.data.srcTypeCustomerCount
        }
   }

   dispatch(action)
}