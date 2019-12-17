import { ProjectState, ProjectActionType, ADD_PROJECT, GET_PROJECT, GET_CUSTOMER_SELECTION_MENU, CLEAR_PROJECT } from "./types"

const initState: ProjectState = {
    projectMenu: null,
    customerSelectionMenu: null
}

export default function customerReducer(state: ProjectState = initState, action: ProjectActionType): ProjectState {
    switch (action.type) {
        case ADD_PROJECT:
            return {
                ...state,
                projectMenu: [
                    ...(state.projectMenu || []),
                    action.payload.project
                ]
            }

        case GET_PROJECT:
            return {
                ...state,
                projectMenu: action.payload.projects
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

        default:
            return state
    }
}