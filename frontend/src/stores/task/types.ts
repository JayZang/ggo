import { ITeam } from 'contracts/team'
import { IMember } from 'contracts/member'
import { ITask } from 'contracts/task'

export const GET_TASK_COUNT_STATISTIC = 'GET_TASK_COUNT_STATISTIC'
export const GET_TASKS = 'GET_TASKS'
export const CLEAR_TASK_LIST_STATE = 'CLEAR_TASK_LIST_STATE'
export const GET_TASK_DETAIL_INFO = 'GET_TASK_DETAIL_INFO'

export type TaskState = {
    listPage: {
        tasks: ITask[] | null
        totalCount: number
    }

    infoPage: {
        task: ITask | null
    }
}

type GetCountStatistic = {
    type: typeof GET_TASK_COUNT_STATISTIC,
    payload: {
        totalCount: number
    }
}

type GetTasks = {
    type: typeof GET_TASKS,
    payload: {
        tasks: ITask[]
    }
}

type ClearTaskListState = {
    type: typeof CLEAR_TASK_LIST_STATE
}

type GetTaskDetailInfo = {
    type: typeof GET_TASK_DETAIL_INFO
    payload: {
        task: ITask
    }
}

export type TaskActionType = 
    GetCountStatistic |
    GetTasks |
    ClearTaskListState |
    GetTaskDetailInfo