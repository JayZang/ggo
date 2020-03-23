import { DashboardState, DashboardActionType, GET_TASKS } from "./types"

const initState: DashboardState = {
    taskList: {
        list: null,
        count: 0
    }
}

export default function dashboardReducer(state: DashboardState = initState, action: DashboardActionType): DashboardState {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                taskList: {
                    list: action.payload.tasks,
                    count: action.payload.count
                }
            }

        default:
            return state
    }
}