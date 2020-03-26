import { DashboardState, DashboardActionType, GET_TASKS, GET_PROJECTS } from "./types"

const initState: DashboardState = {
    tasks: null,
    projects: null
}

export default function dashboardReducer(state: DashboardState = initState, action: DashboardActionType): DashboardState {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload.tasks
            }

        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload.projects
            }

        default:
            return state
    }
}