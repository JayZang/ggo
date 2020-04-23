import { 
    ProjectState, 
    ProjectActionType, 
    ADD_PROJECT, 
    GET_PROJECT_EDIT_PANEL_CUSTOMER_SELECTION, 
    CLEAR_LIST_PAGE_STATE, 
    GET_PROJECT_DETAIL_INFO, 
    UPDATE_PROJECT, 
    GET_PROJECT_COUNT_STATISTIC, 
    GET_PROJECTS,
    GET_PROJECT_EDIT_PANEL_MEMBER_SELECTION,
    GET_PROJECT_EDIT_PANEL_TEAM_SELECTION,
    ADD_PROJECT_MANAGER,
    REMOVE_PROJECT_MANAGER,
    ADD_PROJECT_MEMBER_PARTICIPANT,
    REMOVE_PROJECT_MEMBER_PARTICIPANT
} from "./types"
import { TaskActionType } from "stores/task/types"
import { UserAreaActionType, FINISH_PROJECT } from "stores/userArea/types"

const initState: ProjectState = {
    listPage: {
        projects: null,
        totalCount: 0,
        srcTypeInternalCount: 0,
        srcTypeCustomerCount: 0
    },
    infoPage: {
        project: null,
        tasks: null
    },
    editPanel: {
        customerSelectionMenu: null,
        memberSelectionMenu: null,
        teamSelectionMenu: null
    }
}

export default function customerReducer(state: ProjectState = initState, action: ProjectActionType | TaskActionType | UserAreaActionType): ProjectState {
    switch (action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                listPage: {
                    ...state.listPage,
                    projects: [
                        ...(state.listPage.projects || []),
                        ...action.payload.projects
                    ]
                }
            }

        case ADD_PROJECT:
            return {
                ...state,
                listPage: {
                    ...state.listPage,
                    projects: [
                        action.payload.project,
                        ...(state.listPage.projects || []),
                    ]
                }
            }
        
        case UPDATE_PROJECT:
            return {
                ...state,
                listPage: {
                    ...state.listPage,
                    projects: state.listPage.projects && state.listPage.projects.map(project => {
                        if (project.id === action.payload.project.id)
                            return action.payload.project
                        return project
                    })
                },
                infoPage: {
                    ...state.infoPage,
                    project: state.infoPage.project && (state.infoPage.project.id === action.payload.project.id) ?
                        action.payload.project :
                        state.infoPage.project
                }
            }

        case FINISH_PROJECT:
            return {
                ...state,
                listPage: {
                    ...state.listPage,
                    projects: state.listPage.projects && state.listPage.projects.map(project => {
                        if (project.id === action.payload.projectId) return {
                            ...project,
                            finish_datetime: action.payload.date
                        }
                        return project
                    })
                },
                infoPage: {
                    ...state.infoPage,
                    project: state.infoPage.project && (state.infoPage.project.id === action.payload.projectId) ? {
                        ...state.infoPage.project,
                        finish_datetime: action.payload.date
                    } : state.infoPage.project
                }
            }

        case CLEAR_LIST_PAGE_STATE:
            return {
                ...state,
                listPage: {
                    ...initState.listPage
                }
            }

        case GET_PROJECT_EDIT_PANEL_CUSTOMER_SELECTION:
            return {
                ...state,
                editPanel: {
                    ...state.editPanel,
                    customerSelectionMenu: action.payload.customers
                }
            }

        case GET_PROJECT_EDIT_PANEL_MEMBER_SELECTION:
            return {
                ...state,
                editPanel: {
                    ...state.editPanel,
                    memberSelectionMenu: action.payload.members
                }
            }

        case GET_PROJECT_EDIT_PANEL_TEAM_SELECTION:
            return {
                ...state,
                editPanel: {
                    ...state.editPanel,
                    teamSelectionMenu: action.payload.teams
                }
            }

        case GET_PROJECT_COUNT_STATISTIC:
            return {
                ...state,
                listPage: {
                    ...state.listPage,
                    totalCount: action.payload.totalCount,
                    srcTypeInternalCount: action.payload.srcTypeInternalCount,
                    srcTypeCustomerCount: action.payload.srcTypeCustomerCount
                }
            }

        case GET_PROJECT_DETAIL_INFO:
            return {
                ...state,
                infoPage: {
                    ...state.infoPage,
                    project: action.payload.project,
                    tasks: action.payload.tasks
                }
            }

        case ADD_PROJECT_MANAGER:
        case REMOVE_PROJECT_MANAGER:
        case ADD_PROJECT_MEMBER_PARTICIPANT:
        case REMOVE_PROJECT_MEMBER_PARTICIPANT:
            return {
                ...state,
                infoPage: {
                    ...state.infoPage,
                    project: state.infoPage.project && state.infoPage.project.id === action.payload.project.id ?
                        action.payload.project : state.infoPage.project,
                },
                listPage: {
                    ...state.listPage,
                    projects: state.listPage.projects && state.listPage.projects.map(project => {
                        if (project.id === action.payload.project.id)
                            return action.payload.project
                        return project
                    })
                }
            }

        default:
            return state
    }
}