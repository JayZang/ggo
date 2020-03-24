import { ICustomer } from 'contracts/customer'
import { ITask } from 'contracts/task'

export const GET_TASKS = 'GET_TASKS'

export type DashboardState = {
    tasks: ITask[] | null
}

type GetTasks = {
    type: typeof GET_TASKS,
    payload: {
        tasks: ITask[]
    }
}

export type DashboardActionType = 
    GetTasks