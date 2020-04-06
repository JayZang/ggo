import { ITeam } from 'contracts/team'
import { ITask } from 'contracts/task'
import { IMember } from 'contracts/member'

export const GET_PERMANENT_TEAMS = 'GET_PERMANENT_TEAMS'
export const GET_TEMPORARAY_TEAMS = 'GET_TEMPORARAY_TEAMS'
export const ADD_PERMANENT_TEAM = 'ADD_PERMANENT_TEAM'
export const GET_TEAM_DETAIL_INFO = 'GET_TEAM_DETAIL_INFO'
export const GET_TEAM_TASKS = 'GET_TEAM_TASKS'
export const GET_TEAM_EDIT_PANEL_MEMBER_SELECTION = 'GET_TEAM_EDIT_PANEL_MEMBER_SELECTION'

export type TeamState = {
    listPage: {
        permanentTeams: ITeam[] | null
        temporaryTeams: ITeam[] | null
    }
    infoPage: {
        team: ITeam | null
        tasksOfTeam: {
            tasks: ITask[] | null
            totalCount: number
        }
    },
    editPanel: {
        memberSelectionMenu: IMember[] | null
    }
}

type GetPermanentTeams = {
    type: typeof GET_PERMANENT_TEAMS,
    payload: {
        teams: ITeam[]
    }
}

type GetTemporaryTeams = {
    type: typeof GET_TEMPORARAY_TEAMS,
    payload: {
        teams: ITeam[]
    }
}

type AddPermanentTeam = {
    type: typeof ADD_PERMANENT_TEAM,
    payload: {
        team: ITeam
    }
}

type GetTeamDetailInfo = {
    type: typeof GET_TEAM_DETAIL_INFO,
    payload: {
        team: ITeam
    }
}

type GetTeamTasks = {
    type: typeof GET_TEAM_TASKS,
    payload: {
        tasks: ITask[]
        refresh: boolean
        totalCount: number
    }
}

type GetEditPanelMemberSelection = {
    type: typeof GET_TEAM_EDIT_PANEL_MEMBER_SELECTION,
    payload: {
        members: IMember[]
    }
}

export type TeamActionType = 
    GetPermanentTeams |
    GetTemporaryTeams | 
    AddPermanentTeam |
    GetTeamDetailInfo |
    GetTeamTasks |
    GetEditPanelMemberSelection