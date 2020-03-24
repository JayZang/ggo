import { DashboardState, DashboardActionType, GET_TASKS } from "./types"

const initState: DashboardState = {
    tasks: null
}

export default function dashboardReducer(state: DashboardState = initState, action: DashboardActionType): DashboardState {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload.tasks
            }

        default:
            return state
    }
}