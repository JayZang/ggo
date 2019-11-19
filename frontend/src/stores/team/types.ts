import { ITeam } from 'contracts/team'

export const GET_PERMANENT_TEAMS = 'GET_PERMANENT_TEAMS'
export const GET_TEMPORARAY_TEAMS = 'GET_TEMPORARAY_TEAMS'
export const ADD_PERMANENT_TEAM = 'ADD_PERMANENT_TEAM'

export type TeamState = {
    permanentTeams: ITeam[] | null,
    temporaryTeams: ITeam[] | null
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

export type TeamActionType = 
    GetPermanentTeams |
    GetTemporaryTeams | 
    AddPermanentTeam