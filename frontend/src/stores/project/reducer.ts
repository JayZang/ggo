import { 
    ProjectState, 
    ProjectActionType, 
    ADD_PROJECT, 
    GET_PROJECT_EDIT_PANEL_CUSTOMER_SELECTION, 
    CLEAR_LIST_PAGE_STATE, 
    GET_PROJECT_DETAIL_INFO, 
    UPDATE_PROJECT, 
    UPDATE_PROJECT_FINISH_DATE, 
    GET_PROJECT_COUNT_STATISTIC, 
    GET_PROJECTS,
    GET_PROJECT_EDIT_PANEL_MEMBER_SELECTION,
    GET_PROJECT_EDIT_PANEL_TEAM_SELECTION
} from "./types"
import { UPDATE_TASK_STATUS, TaskActionType, ADD_TASK } from "stores/task/types"

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

export default function customerReducer(state: ProjectState = initState, action: ProjectActionType | TaskActionType): ProjectState {
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
                    projects: (state.listPage.projects || []).map(project => {
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

        case UPDATE_PROJECT_FINISH_DATE:
            return {
                ...state,
                listPage: {
                    ...state.listPage,
                    projects: (state.listPage.projects || []).map(project => {
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

        case ADD_TASK:
            return {
                ...state,
                infoPage: {
                    ...state.infoPage,
                    tasks: state.infoPage.project && state.infoPage.tasks && state.infoPage.project.id === action.payload.task.project_id ? [
                        ...state.infoPage.tasks,
                        action.payload.task
                    ] : state.infoPage.tasks
                }
            }

        case UPDATE_TASK_STATUS:
            return {
                ...state,
                infoPage: {
                    ...state.infoPage,
                    tasks: (state.infoPage.tasks || []).map(task => {
                        if (task.id === action.payload.taskId) return {
                            ...task,
                            status: action.payload.status       
                        }
                        return task
                    })
                }
            }

        default:
            return state
    }
}