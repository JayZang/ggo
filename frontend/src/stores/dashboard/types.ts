import { ICustomer } from 'contracts/customer'
import { ITask } from 'contracts/task'

export const GET_TASKS = 'GET_TASKS'

export type DashboardState = {
    taskList: {
        list: ITask[] | null
        count: number
    }
}

type GetTasks = {
    type: typeof GET_TASKS,
    payload: {
        tasks: ITask[]
        count: number
    }
}

export type DashboardActionType = 
    GetTasks