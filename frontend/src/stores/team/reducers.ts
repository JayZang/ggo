import {
    TeamState,
    TeamActionType,
    GET_PERMANENT_TEAMS,
    GET_TEMPORARAY_TEAMS,
    ADD_PERMANENT_TEAM,
    GET_TEAM_DETAIL_INFO
} from './types'

const initState: TeamState = {
    permanentTeams: null,
    temporaryTeams: null,
    teamsOfMember: null,
    teamDetail: null
}

export default function teamReducer(state: TeamState = initState, action: TeamActionType): TeamState {
    switch (action.type) {
        case GET_PERMANENT_TEAMS:
            return {
                ...state,
                permanentTeams: action.payload.teams
            }

        case GET_TEMPORARAY_TEAMS:
            return {
                ...state,
                temporaryTeams: action.payload.teams
            }

        case ADD_PERMANENT_TEAM:
            return {
                ...state,
                permanentTeams: state.permanentTeams && [
                    ...state.permanentTeams,
                    action.payload.team
                ]
            }

        case GET_TEAM_DETAIL_INFO:
            return {
                ...state,
                teamDetail: action.payload.team
            }

        default:
            return state
    }
}