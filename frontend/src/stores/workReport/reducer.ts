import { WorkReportState, WorkReportActions, GET_WORK_REPORTS, CLEAR_WORK_REPORTS, SET_WORK_REPORT_LIST_FILTER } from "./types";

const initState: WorkReportState = {
    listPage: {
        workReports: null,
        totalCount: 0,
        filter: {
            title: undefined
        }
    }
}

export default (state: WorkReportState = initState, action: WorkReportActions): WorkReportState => {
    switch (action.type) {
        case GET_WORK_REPORTS:
            return {
                ...state,
                listPage: {
                    ...state.listPage,
                    workReports: [
                        ...(state.listPage.workReports || []),
                        ...action.payload.workReports
                    ],
                    totalCount: action.payload.totalCount
                }
            }

        case SET_WORK_REPORT_LIST_FILTER:
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

        case CLEAR_WORK_REPORTS:
            return {
                ...state,
                listPage: {
                    ...initState.listPage
                }
            }

        default:
            return state
    }
}