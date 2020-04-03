import { ITask } from 'contracts/task'
import { IWorkReport } from 'contracts/workReport'

export const GET_TASK_SIMPLE_STATISTIC = 'GET_TASK_SIMPLE_STATISTIC'
export const GET_TASK_LIST = 'GET_TASK_LIST'
export const GET_TASK_INFO = 'GET_TASK_INFO'
export const ADD_TASK_WORK_REPORT = 'ADD_TASK_WORK_REPORT'
export const UPDATE_TASK_WORK_REPORT = 'UPDATE_TASK_WORK_REPORT'

export type UserAreaState = {
    taskPage: {
        default: {
            simpleStatistic: {
                countOfTotal: number
                countOfCompleted: number
                countOfProcessing: number
                countOfWorkReport: number
            }
            listData: {
                totalCount: number
                data: ITask[] | null
            }
        },
        detail: {
            task: ITask | null
        }
    }
}

type GetTaskSimpleStatistic = {
    type: typeof GET_TASK_SIMPLE_STATISTIC,
    payload: {
        countOfTotal: number
        countOfCompleted: number
        countOfProcessing: number
        countOfWorkReport: number
    }
}

type GetTaskList = {
    type: typeof GET_TASK_LIST,
    payload: {
        totalCount: number
        data: ITask[]
        append: boolean
    }
}

type GetTaskInfo = {
    type: typeof GET_TASK_INFO,
    payload: {
        task: ITask
    }
}

type AddTaskWorkReport = {
    type: typeof ADD_TASK_WORK_REPORT,
    payload: {
        workReport: IWorkReport
    }
}

type UpdateTaskWorkReport = {
    type: typeof UPDATE_TASK_WORK_REPORT,
    payload: {
        workReport: IWorkReport
    }
}

export type UserAreaActionType =
    GetTaskSimpleStatistic |
    GetTaskList |
    GetTaskInfo |
    AddTaskWorkReport |
    UpdateTaskWorkReport