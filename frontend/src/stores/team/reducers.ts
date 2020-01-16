import {
    TeamState,
    TeamActionType,
    GET_PERMANENT_TEAMS,
    GET_TEMPORARAY_TEAMS,
    ADD_PERMANENT_TEAM,
    GET_TEAMS_OF_MEMBER,
    CLEAR_TEAMS_OF_MEMBER
} from './types'

const initState: TeamState = {
    permanentTeams: null,
    temporaryTeams: null,
    teamsOfMember: null
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

        case GET_TEAMS_OF_MEMBER:
            return {
                ...state,
                teamsOfMember: action.payload.teams
            }

        case CLEAR_TEAMS_OF_MEMBER:
            return {
                ...state,
                teamsOfMember: null
            }

        default:
            return state
    }
}