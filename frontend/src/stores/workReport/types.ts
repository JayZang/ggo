import { IWorkReport } from "contracts/workReport";

export type WorkReportState = {
    listPage: {
        workReports: IWorkReport[] | null
        totalCount: number
    }
}

export const GET_WORK_REPORTS = 'GET_WORK_REPORTS'
export const CLEAR_WORK_REPORTS = 'CLEAR_WORK_REPORTS'

type GetWorkReports = {
    type: typeof GET_WORK_REPORTS
    payload: {
        workReports: IWorkReport[]
        totalCount: number
    }
}

type ClearWorkReports = {
    type: typeof CLEAR_WORK_REPORTS
}

export type WorkReportActions = 
    GetWorkReports |
    ClearWorkReports