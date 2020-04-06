import { WorkReportState, WorkReportActions, GET_WORK_REPORTS, CLEAR_WORK_REPORTS } from "./types";

const initState: WorkReportState = {
    listPage: {
        workReports: null,
        totalCount: 0
    }
}

export default (state: WorkReportState = initState, action: WorkReportActions): WorkReportState => {
    switch (action.type) {
        case GET_WORK_REPORTS:
            return {
                ...state,
                listPage: {
                    workReports: [
                        ...(state.listPage.workReports || []),
                        ...action.payload.workReports
                    ],
                    totalCount: action.payload.totalCount
                }
            }
        case CLEAR_WORK_REPORTS:
            return {
                ...state,
                listPage: {
                    workReports: null,
                    totalCount: 0
                }
            }

        default:
            return state
    }
}