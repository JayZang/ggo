import { Dispatch } from "redux";

import * as teamAPI from 'api/team'
import * as memberAPI from 'api/member'
import { regularizeTeamData } from './utils'
import { 
    TeamActionType, 
    GET_PERMANENT_TEAMS, 
    GET_TEMPORARAY_TEAMS, 
    ADD_PERMANENT_TEAM,
    GET_TEAM_DETAIL_INFO
} from "./types";

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
        type: GET_TEMPORARAY_TEAMS,
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

export const getTeamById = (id: string | number) => async (dispatch: Dispatch) => {
    const res = await teamAPI.getById(id)

    const action: TeamActionType = {
        type: GET_TEAM_DETAIL_INFO,
        payload: {
            team: regularizeTeamData(res.data)
        }
    }

    dispatch(action)
}