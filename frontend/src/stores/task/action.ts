import { Dispatch } from "redux"

import { TaskActionType, GET_TASK_COUNT_STATISTIC, GET_TASK_DETAIL_INFO, GET_TASKS, CLEAR_TASK_LIST_STATE } from "./types"

import * as taskApi from 'api/task'
import { regularizeTaskData } from "stores/utils/regularizeTaskData"
import { RootState } from "stores"

export const fetchTaskCountStatistic = () => async (dispatch: Dispatch) => {
    const res = await taskApi.getCountStatistic()

    const action: TaskActionType = {
        type: GET_TASK_COUNT_STATISTIC,
        payload: {
            totalCount: res.data.totalCount
        }
   }

   dispatch(action)
}

export const fetchTasks = () => async (dispatch: Dispatch, getState: () => RootState) => {
    const { totalCount, tasks } = getState().task.listPage

    if (tasks && tasks.length >= totalCount)
        return

    const res = await taskApi.get({
        offset: tasks ? tasks.length : 0,
        count: 10
    })

    const action: TaskActionType = {
        type: GET_TASKS,
        payload: {
            tasks: res.data.map(task => regularizeTaskData(task))
        }
   }

   dispatch(action)
}

export const clearTaskListState = () => {
    return {
        type: CLEAR_TASK_LIST_STATE
    }
}

export const fetchTaskDetailInfo = (id: number | string) => async (dispatch: Dispatch) => {
    const res = await taskApi.getTetail(id)

    const action: TaskActionType = {
        type: GET_TASK_DETAIL_INFO,
        payload: {
            task: regularizeTaskData(res.data)
        }
    }

    dispatch(action)
}