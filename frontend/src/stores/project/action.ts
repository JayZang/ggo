import { Dispatch } from "redux";

import * as teamApi from 'api/team'
import * as projectApi from 'api/project'
import * as memberApi from 'api/member'
import * as customerApi from 'api/customer'
import { 
    ADD_PROJECT, 
    ProjectActionType, 
    GET_PROJECT_EDIT_PANEL_CUSTOMER_SELECTION, 
    GET_PROJECT_COUNT_STATISTIC, 
    GET_PROJECT_DETAIL_INFO, 
    UPDATE_PROJECT, 
    UPDATE_PROJECT_FINISH_DATE, 
    GET_PROJECTS, 
    CLEAR_LIST_PAGE_STATE, 
    GET_PROJECT_EDIT_PANEL_MEMBER_SELECTION,
    GET_PROJECT_EDIT_PANEL_TEAM_SELECTION
} from "./types";
import { regularizeProjectData } from "stores/utils/regularizeProjectData";
import { regularizeCustomerData } from "stores/customer/utils";
import { RootState } from "stores";
import { Moment } from "moment";
import { MemberStatus } from "contracts/member";
import { regularizeMemberData } from "stores/utils/regularizeMemberData";
import { regularizeTeamData } from "stores/utils/regularizeTeamData";

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

export const fetchCustomerSelectionMenu = () => async (dispatch : Dispatch) => {
    const res = await customerApi.get()

    const action: ProjectActionType = {
        type: GET_PROJECT_EDIT_PANEL_CUSTOMER_SELECTION,
        payload: {
            customers: res.data.map(customer => regularizeCustomerData(customer))
        }
    }

    dispatch(action)
}

export const fetchMemberSelectionMenu = () => async (dispatch : Dispatch) => {
    const res = await memberApi.get({
        offset: 0,
        count: 999,
        status: MemberStatus.active
    })

    const action: ProjectActionType = {
        type: GET_PROJECT_EDIT_PANEL_MEMBER_SELECTION,
        payload: {
            members: res.data.members.map(member => regularizeMemberData(member))
        }
    }

    dispatch(action)
}

export const fetchTeamSelectionMenu = () => async (dispatch : Dispatch) => {
    const res = await teamApi.getPermanentTeams()

    const action: ProjectActionType = {
        type: GET_PROJECT_EDIT_PANEL_TEAM_SELECTION,
        payload: {
            teams: res.data.map(team => regularizeTeamData(team))
        }
    }

    dispatch(action)
}