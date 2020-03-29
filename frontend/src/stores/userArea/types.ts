import { ITask } from 'contracts/task'

export const GET_TASK_SIMPLE_STATISTIC = 'GET_TASK_SIMPLE_STATISTIC'
export const GET_TASK_LIST = 'GET_TASK_LIST'

export type UserAreaState = {
    taskPage: {
        default: {
            simpleStatistic: {
                countOfTotal: number
                countOfCompleted: number
                countOfProcessing: number
            }
            listData: {
                totalCount: number
                data: ITask[] | null
            }
        }
    }
}

type GetTaskSimpleStatistic = {
    type: typeof GET_TASK_SIMPLE_STATISTIC,
    payload: {
        countOfTotal: number
        countOfCompleted: number
        countOfProcessing: number
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

export type UserAreaActionType =
    GetTaskSimpleStatistic |
    GetTaskList