import { Dispatch } from "redux";

import * as projectApi from 'api/project'
import * as customerApi from 'api/customer'
import * as taskApi from 'api/task'
import { ADD_PROJECTS, ProjectActionType, GET_CUSTOMER_SELECTION_MENU, CLEAR_PROJECT, GET_COUNT_STATISTIC, GET_PROJECT_BASE_INFO, UPDATE_PROJECT, CLEAR_PROJECT_DETAIL, ADD_PROJECT_TASK, UPDATE_PROJECT_FINISH_DATE } from "./types";
import { regularizeProjectData } from "./utils";
import { regularizeCustomerData } from "stores/customer/utils";
import { RootState } from "stores";
import { regularizeTaskData } from "stores/task/utils";
import { Moment } from "moment";

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

export const updateProject = (id: string | number, data: any) => async (dispatch: Dispatch) => {
    const res = await projectApi.update(id, data)

    const action: ProjectActionType = {
        type: UPDATE_PROJECT,
        payload: {
            project: regularizeProjectData(res.data)
        }
    }

    dispatch(action)
}

export const finishProject = (id: number | string, date: Moment) => async (dispatch: Dispatch) => {
    await projectApi.finish(id, date.toString())

    const action: ProjectActionType = {
        type: UPDATE_PROJECT_FINISH_DATE,
        payload: {
            projectId: id,
            date
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

export const fetchProjectBaseInfo = (id: string) => async (dispatch: Dispatch) => {
    const res = await projectApi.getBaseInfo(id)

    const action: ProjectActionType = {
        type: GET_PROJECT_BASE_INFO,
        payload: {
            project: regularizeProjectData(res.data)
        }
   }

   dispatch(action)
}

export const createProjectTask = (id: number | string, data: any) => async (dispatch: Dispatch) => {
    const res = await taskApi.create({
        project_id: id,
        ...data
    })

    const action: ProjectActionType = {
        type: ADD_PROJECT_TASK,
        payload: {
            task: regularizeTaskData(res.data)
        }
   }

   dispatch(action)
}

export const clearProjectDetail = () => {
    return {
        type: CLEAR_PROJECT_DETAIL
   }
}