import { IWorkReport } from "contracts/workReport";

export type WorkReportState = {
    listPage: {
        workReports: IWorkReport[] | null
        totalCount: number
        filter: {
            title: string | undefined
        }
    }
}

export const GET_WORK_REPORTS = 'GET_WORK_REPORTS'
export const SET_WORK_REPORT_LIST_FILTER = 'SET_WORK_REPORT_LIST_FILTER'
export const CLEAR_WORK_REPORTS = 'CLEAR_WORK_REPORTS'

type GetWorkReports = {
    type: typeof GET_WORK_REPORTS
    payload: {
        workReports: IWorkReport[]
        totalCount: number
    }
}

type SetListFilter = {
    type: typeof SET_WORK_REPORT_LIST_FILTER
    payload: {
        title?: string
    }
}

type ClearWorkReports = {
    type: typeof CLEAR_WORK_REPORTS
}

export type WorkReportActions = 
    GetWorkReports |
    SetListFilter |
    ClearWorkReports