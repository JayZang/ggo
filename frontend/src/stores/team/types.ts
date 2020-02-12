import { ITeam } from 'contracts/team'

export const GET_PERMANENT_TEAMS = 'GET_PERMANENT_TEAMS'
export const GET_TEMPORARAY_TEAMS = 'GET_TEMPORARAY_TEAMS'
export const ADD_PERMANENT_TEAM = 'ADD_PERMANENT_TEAM'
export const GET_TEAMS_OF_MEMBER = 'GET_TEAMS_OF_MEMBER'
export const CLEAR_TEAMS_OF_MEMBER = 'CLEAR_TEAMS_OF_MEMBER'
export const GET_TEAM_DETAIL_INFO = 'GET_TEAM_DETAIL_INFO'

export type TeamState = {
    permanentTeams: ITeam[] | null,
    temporaryTeams: ITeam[] | null,
    teamsOfMember: ITeam[] | null,
    teamDetail: ITeam | null
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

type GetTeamsOfMember = {
    type: typeof GET_TEAMS_OF_MEMBER,
    payload: {
        teams: ITeam[]
    }
}

type ClearTeamsOfMember = {
    type: typeof CLEAR_TEAMS_OF_MEMBER,
}

type GetTeamDetailInfo = {
    type: typeof GET_TEAM_DETAIL_INFO,
    payload: {
        team: ITeam
    }
}

export type TeamActionType = 
    GetPermanentTeams |
    GetTemporaryTeams | 
    AddPermanentTeam |
    GetTeamsOfMember | 
    ClearTeamsOfMember |
    GetTeamDetailInfo