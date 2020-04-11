import { Dispatch } from "redux";

import * as teamAPI from 'api/team'
import * as memberApi from 'api/member'
import { regularizeTeamData } from 'stores/utils/regularizeTeamData'
import { 
    TeamActionType, 
    GET_PERMANENT_TEAMS, 
    GET_TEMPORARY_TEAMS, 
    ADD_PERMANENT_TEAM,
    GET_TEAM_DETAIL_INFO,
    GET_TEAM_TASKS,
    GET_TEAM_EDIT_PANEL_MEMBER_SELECTION,
    UPDATE_TEAM
} from "./types";
import { RootState } from "stores";
import { regularizeTaskData } from "stores/utils/regularizeTaskData";
import { regularizeMemberData } from "stores/utils/regularizeMemberData";
import { MemberStatus } from "contracts/member";

export const getPermanentTeams = () => async (dispatch : Dispatch) => {
    const res = await teamAPI.getPermanentTeams()

    const action: TeamActionType = {
        type: GET_PERMANENT_TEAMS,
        payload: {
            teams: res.data.map(team => regularizeTeamData(team))
        }
    }

    dispatch(action)
}

export const getTemporaryTeams = () => async (dispatch : Dispatch) => {
    const res = await teamAPI.getTemporaryTeams()

    const action: TeamActionType = {
        type: GET_TEMPORARY_TEAMS,
        payload: {
            teams: res.data.map(team => regularizeTeamData(team))
        }
    }

    dispatch(action)
}

export const createTeam = (data: any) => async (dispatch: Dispatch) => {
    const res = await teamAPI.createTeam(data)

    const action: TeamActionType = {
        type: ADD_PERMANENT_TEAM,
        payload: {
            team: regularizeTeamData(res.data)
        }
    }

    dispatch(action)
}

export const updateTeam = (id: number | string, data: any) => async (dispatch: Dispatch) => {
    const res = await teamAPI.updateTeam(id, data)

    const action: TeamActionType = {
        type: UPDATE_TEAM,
        payload: {
            team: regularizeTeamData(res.data)
        }
    }

    dispatch(action)
}

export const fetchTeamDetailInfo = (id: string | number) => async (dispatch: Dispatch) => {
    const res = await teamAPI.getById(id)

    const action: TeamActionType = {
        type: GET_TEAM_DETAIL_INFO,
        payload: {
            team: regularizeTeamData(res.data)
        }
    }

    dispatch(action)
}

export const fetchTeamTasks = (teamId: number | string, refresh = false) => async (dispatch: Dispatch, getState: () => RootState) => {
    const { tasks, totalCount } = refresh ? 
        { tasks: null, totalCount: 0} :
        getState().team.infoPage.tasksOfTeam

    if (tasks && tasks.length >= totalCount)
        return

    const res = await teamAPI.getTasksByTeam(teamId, {
        offset: tasks ? tasks.length : 0,
        count: 10
    })

    const action: TeamActionType = {
        type: GET_TEAM_TASKS,
        payload: {
            refresh,
            tasks: res.data.tasks.map(task => regularizeTaskData(task)),
            totalCount: res.data.count
        }
    }

    dispatch(action)
}

export const fetchEditPanelMemberSelection = () => async (dispatch: Dispatch) => {
    const res = await memberApi.get({ 
        offset: 0, 
        count: 999, 
        status: MemberStatus.active 
    })

    const action: TeamActionType = {
        type: GET_TEAM_EDIT_PANEL_MEMBER_SELECTION,
        payload: {
            members: res.data.members.map(member => regularizeMemberData(member))
        }
    }

    dispatch(action)
}