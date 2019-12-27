import { ProjectState, ProjectActionType, ADD_PROJECTS, GET_CUSTOMER_SELECTION_MENU, CLEAR_PROJECT, GET_COUNT_STATISTIC, GET_PROJECT_BASE_INFO, UPDATE_PROJECT, GET_PROJECT_TASKS, CLEAR_PROJECT_DETAIL } from "./types"

const initState: ProjectState = {
    projectMenu: null,
    customerSelectionMenu: null,
    statistics: {
        totalCount: 0,
        srcTypeInternalCount: 0,
        srcTypeCustomerCount: 0,
    },
    projectDetail: {
        baseInfo: null,
        tasks: null
    }
}

export default function customerReducer(state: ProjectState = initState, action: ProjectActionType): ProjectState {
    switch (action.type) {
        case ADD_PROJECTS:
            return {
                ...state,
                projectMenu: action.payload.prepend ? [
                    ...action.payload.projects,
                    ...(state.projectMenu || [])
                ] : [
                    ...(state.projectMenu || []),
                    ...action.payload.projects
                ]
            }
        
        case UPDATE_PROJECT:
            return {
                ...state,
                projectMenu: state.projectMenu && state.projectMenu.map(project => {
                    if (project.id === action.payload.project.id)
                        return action.payload.project
                    return project
                }),
                projectDetail: {
                    ...state.projectDetail,
                    baseInfo: state.projectDetail.baseInfo && state.projectDetail.baseInfo.id === action.payload.project.id ? 
                        action.payload.project :
                        state.projectDetail.baseInfo
                }
            }

        case CLEAR_PROJECT:
            return {
                ...state,
                projectMenu: null
            }

        case GET_CUSTOMER_SELECTION_MENU:
            return {
                ...state,
                customerSelectionMenu: action.payload.customers
            }

        case GET_COUNT_STATISTIC:
            return {
                ...state,
                statistics: {
                    ...state.statistics,
                    totalCount: action.payload.totalCount,
                    srcTypeInternalCount: action.payload.srcTypeInternalCount,
                    srcTypeCustomerCount: action.payload.srcTypeCustomerCount
                }
            }

        case GET_PROJECT_BASE_INFO:
            return {
                ...state,
                projectDetail: {
                    ...state.projectDetail,
                    baseInfo: action.payload.project
                }
            }
            
        case GET_PROJECT_TASKS:
            return {
                ...state,
                projectDetail: {
                    ...state.projectDetail,
                    tasks: action.payload.tasks
                }
            }
            
        case CLEAR_PROJECT_DETAIL:
            return {
                ...state,
                projectDetail: {
                    baseInfo: null,
                    tasks: null
                }
            }

        default:
            return state
    }
}