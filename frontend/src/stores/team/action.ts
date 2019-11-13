import { Dispatch } from "redux";

import * as teamAPI from 'api/team'
import { regularizeTeamData } from './utils'
import { 
    TeamActionType, 
    GET_PERMANENT_TEAMS, 
    GET_TEMPORARAY_TEAMS 
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