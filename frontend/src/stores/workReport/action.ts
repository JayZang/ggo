import { Dispatch } from "redux";

import { WorkReportActions, GET_WORK_REPORTS, CLEAR_WORK_REPORTS } from "./types";
import * as workReportApi from 'api/workReport'
import { RootState } from "stores";
import { regularizeWorkReportData } from "stores/utils/regularizeWorkReportData";

export const fetchWorkReports = () => async (dispatch: Dispatch, getState: () => RootState) => {
    const {
        totalCount,
        workReports
    } = getState().workReport.listPage

    if (workReports && workReports.length >= totalCount)
        return

    const res = await workReportApi.get({
        count: 10,
        offset: workReports ? workReports.length : 0
    })

    const action: WorkReportActions = {
        type: GET_WORK_REPORTS,
        payload: {
            workReports: res.data.workReports.map(workReport => regularizeWorkReportData(workReport)),
            totalCount: res.data.count
        }
    }

    dispatch(action)
}

export const clearWorkReports = () => {
    const action: WorkReportActions = {
        type: CLEAR_WORK_REPORTS,
    }

    return action
}