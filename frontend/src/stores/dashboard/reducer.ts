import { DashboardState, DashboardActionType, GET_DASHBOARD_TASKS, GET_DASHBOARD_PROJECTS, GET_DASHBOARD_WORK_REPORTS } from "./types"

const initState: DashboardState = {
    tasks: null,
    projects: null,
    workReports: null
}

export default function dashboardReducer(state: DashboardState = initState, action: DashboardActionType): DashboardState {
    switch (action.type) {
        case GET_DASHBOARD_TASKS:
            return {
                ...state,
                tasks: action.payload.tasks
            }

        case GET_DASHBOARD_PROJECTS:
            return {
                ...state,
                projects: action.payload.projects
            }

        case GET_DASHBOARD_WORK_REPORTS:
            return {
                ...state,
                workReports: action.payload.workReports
            }

        default:
            return state
    }
}