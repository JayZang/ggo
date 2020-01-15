import { ProjectState, ProjectActionType, ADD_PROJECTS, GET_CUSTOMER_SELECTION_MENU, CLEAR_PROJECT, GET_PROJECT_BASE_INFO, UPDATE_PROJECT, CLEAR_PROJECT_DETAIL, UPDATE_PROJECT_FINISH_DATE, GET_PROJECT_COUNT_STATISTIC } from "./types"
import _ from 'lodash'

const initState: ProjectState = {
    projectMenu: null,
    customerSelectionMenu: null,
    statistics: {
        totalCount: 0,
        srcTypeInternalCount: 0,
        srcTypeCustomerCount: 0,
    },
    projectDetail: {
        baseInfo: null
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

        case UPDATE_PROJECT_FINISH_DATE:
            return {
                ...state,
                projectMenu: state.projectMenu && state.projectMenu.map(project => {
                    if (project.id === action.payload.projectId)
                        project.finish_datetime = action.payload.date
                    return project
                }),
                projectDetail: {
                    ...state.projectDetail,
                    baseInfo: (() => {
                        let baseInfo = state.projectDetail.baseInfo
                        if (baseInfo && baseInfo.id === action.payload.projectId) {
                            baseInfo = _.cloneDeep(baseInfo)
                            baseInfo.finish_datetime = action.payload.date
                        }
                        return baseInfo
                    })()
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

        case GET_PROJECT_COUNT_STATISTIC:
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
            
        case CLEAR_PROJECT_DETAIL:
            return {
                ...state,
                projectDetail: {
                    baseInfo: null
                }
            }

        default:
            return state
    }
}