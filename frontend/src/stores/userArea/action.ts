import { Dispatch } from "redux";

import * as userAreaTaskApi from 'api/userArea/task'
import { regularizeTaskData } from "stores/task/utils";
import { UserAreaActionType, GET_TASK_LIST, GET_TASK_SIMPLE_STATISTIC, GET_TASK_INFO } from "./types";
import { RootState } from "stores";

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