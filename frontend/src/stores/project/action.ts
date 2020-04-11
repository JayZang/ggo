import { Dispatch } from "redux";

import * as projectApi from 'api/project'
import * as customerApi from 'api/customer'
import { 
    ADD_PROJECT, 
    ProjectActionType, 
    GET_CUSTOMER_SELECTION_MENU, 
    GET_PROJECT_COUNT_STATISTIC, 
    GET_PROJECT_DETAIL_INFO, 
    UPDATE_PROJECT, 
    UPDATE_PROJECT_FINISH_DATE, 
    GET_PROJECTS, 
    CLEAR_LIST_PAGE_STATE 
} from "./types";
import { regularizeProjectData } from "stores/utils/regularizeProjectData";
import { regularizeCustomerData } from "stores/customer/utils";
import { RootState } from "stores";
import { Moment } from "moment";

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

export const fetchProjects = () => async (dispatch: Dispatch, getState: () => RootState) => {
    const {
        totalCount,
        projects
    } = getState().project.listPage

    if (projects && projects.length >= totalCount)
        return

   const res = await projectApi.get({
       offset: projects ? projects.length : 0,
       count: 10
   })

   const action: ProjectActionType = {
        type: GET_PROJECTS,
        payload: {
            projects: res.data.map(project => regularizeProjectData(project))
        }
   }

   dispatch(action)
}

export const loadListPage = () => async (dispatch : Dispatch, getState: () => RootState) => {
    getCountStatistic()(dispatch)
    fetchProjects()(dispatch, getState)
}

export const reloadListPage = () => async (dispatch : Dispatch, getState: () => RootState) => {
    dispatch({ type: CLEAR_LIST_PAGE_STATE })
    getCountStatistic()(dispatch)
    fetchProjects()(dispatch, getState)
}

export const getCountStatistic = () => async (dispatch: Dispatch) => {
    const res = await projectApi.getCountStatistic()

    const action: ProjectActionType = {
        type: GET_PROJECT_COUNT_STATISTIC,
        payload: {
            totalCount: res.data.totalCount,
            srcTypeInternalCount: res.data.srcTypeInternalCount,
            srcTypeCustomerCount: res.data.srcTypeCustomerCount
        }
   }

   dispatch(action)
}

export const fetchProjectDetailInfo = (id: string) => async (dispatch: Dispatch) => {
    const res = await projectApi.geDetailInfo(id)
    
    const project = regularizeProjectData(res.data)
    const action: ProjectActionType = {
        type: GET_PROJECT_DETAIL_INFO,
        payload: {
            project,
            tasks: project.tasks || []
        }
   }

   dispatch(action)
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