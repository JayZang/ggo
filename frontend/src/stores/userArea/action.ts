import { Dispatch } from "redux";

import * as userAreaTaskApi from 'api/userArea/task'
import { regularizeTaskData } from "stores/utils/regularizeTaskData";
import { UserAreaActionType, GET_TASK_LIST, GET_TASK_SIMPLE_STATISTIC, GET_TASK_INFO, ADD_TASK_WORK_REPORT, UPDATE_TASK_WORK_REPORT } from "./types";
import { RootState } from "stores";
import { regularizeWorkReportData } from "stores/utils/regularizeWorkReportData";

export const fetchSimpleStatistic = () => async (dispatch: Dispatch) => {
    const res = await userAreaTaskApi.getSimpleStatistic()

    const action: UserAreaActionType = {
        type: GET_TASK_SIMPLE_STATISTIC,
        payload: {
            ...res.data
        }
    }

    dispatch(action)
}

export const fetchTasks = () => async (dispatch: Dispatch, getState: () => RootState) => {
    const { data: tasks, totalCount } = getState().userArea.taskPage.default.listData

    if (tasks && tasks.length >= totalCount)
        return

    const res = await userAreaTaskApi.getTaskList({
        count: 10,
        offset: tasks ? tasks.length : 0
    })

    const action: UserAreaActionType = {
        type: GET_TASK_LIST,
        payload: {
            totalCount: res.data.count,
            data: res.data.tasks.map(task => regularizeTaskData(task)),
            append: !!tasks
        }
    }

    dispatch(action)
}

export const fetchTaskInfo = (id: number) => async (dispatch: Dispatch) => {
    const res = await userAreaTaskApi.getTaskInfo(id)

    const action: UserAreaActionType = {
        type: GET_TASK_INFO,
        payload: {
            task: regularizeTaskData(res.data)
        }
    }

    dispatch(action)
}

export const createWorkReport = (taskId: number, data: any) => async (dispatch: Dispatch) => {
    const res = await userAreaTaskApi.createWorkReport(taskId, data)

    const action: UserAreaActionType = {
        type: ADD_TASK_WORK_REPORT,
        payload: {
            workReport: regularizeWorkReportData(res.data)
        }
    }

    dispatch(action)
}

export const updateWorkReport = (taskId: number, workReportId: number, data: any) => async (dispatch: Dispatch) => {
    const res = await userAreaTaskApi.updateWorkReport(taskId, workReportId, data)

    const action: UserAreaActionType = {
        type: UPDATE_TASK_WORK_REPORT,
        payload: {
            workReport: regularizeWorkReportData(res.data)
        }
    }

    dispatch(action)
}