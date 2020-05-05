import { ITask } from 'contracts/task'
import { ITeam } from 'contracts/team'
import { IProject } from 'contracts/project'
import { IMember } from 'contracts/member'
import { ICustomer } from 'contracts/customer'

export const GET_PROJECTS = 'GET_PROJECTS'
export const SET_PROJECT_LIST_FILTER = 'SET_PROJECT_LIST_FILTER'
export const ADD_PROJECT = 'ADD_PROJECT'
export const UPDATE_PROJECT = 'UPDATE_PROJECT'
export const CLEAR_LIST_PAGE_STATE = 'CLEAR_LIST_PAGE_STATE'
export const GET_PROJECT_COUNT_STATISTIC = 'GET_PROJECT_COUNT_STATISTIC'
export const GET_PROJECT_DETAIL_INFO = 'GET_PROJECT_DETAIL_INFO'
export const ADD_PROJECT_MANAGER = 'ADD_PROJECT_MANAGER'
export const REMOVE_PROJECT_MANAGER = 'REMOVE_PROJECT_MANAGER'
export const ADD_PROJECT_MEMBER_PARTICIPANT = 'ADD_PROJECT_MEMBER_PARTICIPANT'
export const REMOVE_PROJECT_MEMBER_PARTICIPANT = 'REMOVE_PROJECT_MEMBER_PARTICIPANT'

export const GET_PROJECT_EDIT_PANEL_CUSTOMER_SELECTION = 'GET_PROJECT_EDIT_PANEL_CUSTOMER_SELECTION'
export const GET_PROJECT_EDIT_PANEL_MEMBER_SELECTION = 'GET_PROJECT_EDIT_PANEL_MEMBER_SELECTION'
export const GET_PROJECT_EDIT_PANEL_TEAM_SELECTION = 'GET_PROJECT_EDIT_PANEL_TEAM_SELECTION'

export type ProjectState = {
    listPage: {
        projects: IProject[] | null
        totalCount: number
        srcTypeInternalCount: number
        srcTypeCustomerCount: number
        filter: {
            name: string | undefined
        }
    }

    infoPage: {
        project: IProject | null
        tasks: ITask[] | null
    }

    editPanel: {
        customerSelectionMenu: ICustomer[] | null
        memberSelectionMenu: IMember[] | null
        teamSelectionMenu: ITeam[] | null
    }
}

type GetProjects = {
    type: typeof GET_PROJECTS,
    payload: {
        projects: IProject[]
    }
}

type SetListFilter = {
    type: typeof SET_PROJECT_LIST_FILTER,
    payload: {
        name?: string
    }
}

type AddProject = {
    type: typeof ADD_PROJECT,
    payload: {
        project: IProject
    }
}

type UpdateProject = {
    type: typeof UPDATE_PROJECT,
    payload: {
        project: IProject
    }
}

type ClearListPageState = {
    type: typeof CLEAR_LIST_PAGE_STATE,
}

type GetCustomerSelectionMenu = {
    type: typeof GET_PROJECT_EDIT_PANEL_CUSTOMER_SELECTION,
    payload: {
        customers: ICustomer[]
    }
}

type GetMemberSelectionMenu = {
    type: typeof GET_PROJECT_EDIT_PANEL_MEMBER_SELECTION,
    payload: {
        members: IMember[]
    }
}

type GetTeamSelectionMenu = {
    type: typeof GET_PROJECT_EDIT_PANEL_TEAM_SELECTION,
    payload: {
        teams: ITeam[]
    }
}

type GetCountStatistic = {
    type: typeof GET_PROJECT_COUNT_STATISTIC,
    payload: {
        totalCount: number
        srcTypeInternalCount: number
        srcTypeCustomerCount: number
    }
}

type GetProjectDetailInfo = {
    type: typeof GET_PROJECT_DETAIL_INFO,
    payload: {
        project: IProject
        tasks: ITask[]
    }
}

type AddProjectManager = {
    type: typeof ADD_PROJECT_MANAGER,
    payload: {
        project: IProject
    }
}

type RemoveProjectManager = {
    type: typeof REMOVE_PROJECT_MANAGER,
    payload: {
        project: IProject
    }
}

type AddProjectMemberParticipant = {
    type: typeof ADD_PROJECT_MEMBER_PARTICIPANT,
    payload: {
        project: IProject
    }
}

type RemoveProjectMemberParticipant = {
    type: typeof REMOVE_PROJECT_MEMBER_PARTICIPANT,
    payload: {
        project: IProject
    }
}

export type ProjectActionType = 
    GetProjects |
    SetListFilter |
    AddProject |
    UpdateProject |
    ClearListPageState |
    GetCountStatistic |
    GetProjectDetailInfo |
    GetCustomerSelectionMenu |
    GetMemberSelectionMenu |
    GetTeamSelectionMenu |
    AddProjectManager |
    RemoveProjectManager |
    AddProjectMemberParticipant |
    RemoveProjectMemberParticipant