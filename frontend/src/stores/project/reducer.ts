import { ProjectState, ProjectActionType, ADD_PROJECTS, GET_CUSTOMER_SELECTION_MENU, CLEAR_PROJECT, GET_COUNT_STATISTIC } from "./types"

const initState: ProjectState = {
    projectMenu: null,
    customerSelectionMenu: null,
    statistics: {
        totalCount: 0,
        srcTypeInternalCount: 0,
        srcTypeCustomerCount: 0,
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

        default:
            return state
    }
}