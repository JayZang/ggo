import {
    TeamState,
    TeamActionType,
    GET_PERMANENT_TEAMS,
    GET_TEMPORARAY_TEAMS,
    ADD_PERMANENT_TEAM,
    GET_TEAM_DETAIL_INFO,
    GET_TEAM_TASKS,
    GET_TEAM_EDIT_PANEL_MEMBER_SELECTION
} from './types'

const initState: TeamState = {
    listPage: {
        permanentTeams: null,
        temporaryTeams: null,
    },
    infoPage: {
        team: null,
        tasksOfTeam: {
            tasks: null,
            totalCount: 0
        }
    },
    editPanel: {
        memberSelectionMenu: null
    }
}

export default function teamReducer(state: TeamState = initState, action: TeamActionType): TeamState {
    switch (action.type) {
        case GET_PERMANENT_TEAMS:
            return {
                ...state,
                listPage: {
                    ...state.listPage,
                    permanentTeams: action.payload.teams
                }
            }

        case GET_TEMPORARAY_TEAMS:
            return {
                ...state,
                listPage: {
                    ...state.listPage,
                    temporaryTeams: action.payload.teams
                }
            }

        case ADD_PERMANENT_TEAM:
            return {
                ...state,
                listPage: {
                    ...state.listPage,
                    permanentTeams: state.listPage.permanentTeams && [
                        ...state.listPage.permanentTeams,
                        action.payload.team
                    ]
                }
            }

        case GET_TEAM_DETAIL_INFO:
            return {
                ...state,
                infoPage: {
                    ...state.infoPage,
                    team: action.payload.team
                } 
            }

        case GET_TEAM_TASKS:
            return {
                ...state,
                infoPage: {
                    ...state.infoPage,
                    tasksOfTeam: {
                        totalCount: action.payload.totalCount,
                        tasks: [
                            ...(action.payload.refresh ? [] : (state.infoPage.tasksOfTeam.tasks || [])),
                            ...action.payload.tasks
                        ]
                    }
                } 
            }

        case GET_TEAM_EDIT_PANEL_MEMBER_SELECTION:
            return {
                ...state,
                editPanel: {
                    ...state.editPanel,
                    memberSelectionMenu: action.payload.members
                }
            }

        default:
            return state
    }
}