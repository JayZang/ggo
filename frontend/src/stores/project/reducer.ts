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
    REMOVE_PROJECT_MEMBER_PARTICIPANT,
    SET_PROJECT_LIST_FILTER
} from "./types"
import { TaskActionType } from "stores/task/types"
import { UserAreaActionType, FINISH_PROJECT, UPDATE_PROJECT_TASK_STATUS, ADD_PROJECT_TASK } from "stores/userArea/types"

const initState: ProjectState = {
    listPage: {
        projects: null,
        totalCount: 0,
        srcTypeInternalCount: 0,
        srcTypeCustomerCount: 0,
        filter: {
            name: undefined
        }
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

        case SET_PROJECT_LIST_FILTER:
            return {
                ...state,
                listPage: {
                    ...state.listPage,
                    filter: {
                        ...state.listPage.filter,
                        ...action.payload
                    }
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

        case UPDATE_PROJECT_TASK_STATUS:
            return {
                ...state,
                infoPage: {
                    ...state.infoPage,
                    tasks: state.infoPage.tasks && state.infoPage.tasks.map(task => {
                        if (task.id === action.payload.taskId)
                            return {
                                ...task,
                                status: action.payload.status
                            }
                        return task
                    })
                }
            }

        case ADD_PROJECT_TASK:
            return {
                ...state,
                infoPage: {
                    ...state.infoPage,
                    tasks: state.infoPage.project && 
                        state.infoPage.project.id === action.payload.task.project_id && 
                        state.infoPage.tasks ? [
                            ...state.infoPage.tasks,
                            action.payload.task
                        ] : state.infoPage.tasks
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