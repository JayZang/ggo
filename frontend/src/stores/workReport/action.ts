import { Dispatch } from "redux";

import { RootState } from "stores";
import * as workReportApi from 'api/workReport'
import { regularizeWorkReportData } from "stores/utils/regularizeWorkReportData";
import { WorkReportActions, GET_WORK_REPORTS, CLEAR_WORK_REPORTS, SET_WORK_REPORT_LIST_FILTER } from "./types";
import { IWorkReport } from "contracts/workReport";

export const fetchWorkReports = () => async (dispatch: Dispatch, getState: () => RootState) => {
    const {
        totalCount,
        workReports,
        filter: listFilter
    } = getState().workReport.listPage

    if (workReports && workReports.length >= totalCount)
        return

    const res = await workReportApi.get({
        ...listFilter,
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

export function setListFilter(
    parameters: Partial<Record<keyof IWorkReport, any>>
) {
    return {
        type: SET_WORK_REPORT_LIST_FILTER,
        payload: {
            title: parameters.title
        }
    }
}

export const clearWorkReports = () => {
    const action: WorkReportActions = {
        type: CLEAR_WORK_REPORTS,
    }

    return action
}