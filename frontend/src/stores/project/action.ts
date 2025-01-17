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
    GET_PROJECTS, 
    CLEAR_LIST_PAGE_STATE, 
    GET_PROJECT_EDIT_PANEL_MEMBER_SELECTION,
    GET_PROJECT_EDIT_PANEL_TEAM_SELECTION,
    ADD_PROJECT_MANAGER,
    REMOVE_PROJECT_MANAGER,
    ADD_PROJECT_MEMBER_PARTICIPANT,
    REMOVE_PROJECT_MEMBER_PARTICIPANT,
    SET_PROJECT_LIST_FILTER
} from "./types";
import { RootState } from "stores";
import { MemberStatus } from "contracts/member";
import { regularizeCustomerData } from "stores/utils/regularizeCustomerData";
import { regularizeTeamData } from "stores/utils/regularizeTeamData";
import { regularizeProjectData } from "stores/utils/regularizeProjectData";
import { regularizeMemberData } from "stores/utils/regularizeMemberData";
import { IProject } from "contracts/project";

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

export const fetchProjects = () => async (dispatch: Dispatch, getState: () => RootState) => {
    const {
        projects,
        totalCount,
        filter: listFilter
    } = getState().project.listPage

    if (projects && projects.length >= totalCount)
        return

   const res = await projectApi.get({
       ...listFilter,
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

export function setListFilter(parameters: Partial<Record<keyof IProject, any>>) {
    return {
        type: SET_PROJECT_LIST_FILTER,
        payload: {
            name: parameters.name
        }
    }
}

export const loadListPage = () => async (dispatch : Dispatch, getState: () => RootState) => {
    await Promise.all([
        getCountStatistic()(dispatch, getState),
        fetchProjects()(dispatch, getState)
    ])
}

export function clearListPageState() {
    return {
        type: CLEAR_LIST_PAGE_STATE
    }
}

export const reloadListPage = () => async (dispatch : Dispatch, getState: () => RootState) => {
    dispatch(clearListPageState())
    await Promise.all([
        getCountStatistic()(dispatch, getState),
        fetchProjects()(dispatch, getState)
    ])
}

export const getCountStatistic = () => async (dispatch: Dispatch, getState: () => RootState) => {
    const { filter } = getState().project.listPage
    const res = await projectApi.getCountStatistic(filter)

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

export const addProjectManager = (id: number | string, memberId: number | string) => async (dispatch: Dispatch) => {
    const res = await projectApi.addManager(id, memberId)

    const action: ProjectActionType = {
        type: ADD_PROJECT_MANAGER,
        payload: {
            project: regularizeProjectData(res.data)
        }
   }

   dispatch(action)
}

export const removeProjectManager = (id: number | string, memberId: number | string) => async (dispatch: Dispatch) => {
    const res = await projectApi.removeManager(id, memberId)

    const action: ProjectActionType = {
        type: REMOVE_PROJECT_MANAGER,
        payload: {
            project: regularizeProjectData(res.data)
        }
   }

   dispatch(action)
}

export const addProjectMemberParticipant = (id: number | string, memberId: number | string) => async (dispatch: Dispatch) => {
    const res = await projectApi.addMemberParticipant(id, memberId)

    const action: ProjectActionType = {
        type: ADD_PROJECT_MEMBER_PARTICIPANT,
        payload: {
            project: regularizeProjectData(res.data)
        }
   }

   dispatch(action)
}

export const removeProjectMemberParticipant = (id: number | string, memberId: number | string) => async (dispatch: Dispatch) => {
    const res = await projectApi.removeMemberParticipant(id, memberId)

    const action: ProjectActionType = {
        type: REMOVE_PROJECT_MEMBER_PARTICIPANT,
        payload: {
            project: regularizeProjectData(res.data)
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
            members: res.data.map(member => regularizeMemberData(member))
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