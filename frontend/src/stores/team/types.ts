import { ITeam } from 'contracts/team'

export const GET_PERMANENT_TEAMS = 'GET_PERMANENT_TEAMS'
export const GET_TEMPORARAY_TEAMS = 'GET_TEMPORARAY_TEAMS'

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

export type TeamActionType = 
    GetPermanentTeams |
    GetTemporaryTeams