import { ITask } from 'contracts/task'
import { IProject } from 'contracts/project'

export const GET_TASKS = 'GET_TASKS'
export const GET_PROJECTS = 'GET_PROJECTS'

export type DashboardState = {
    tasks: ITask[] | null
    projects: IProject[] | null
}

type GetTasks = {
    type: typeof GET_TASKS,
    payload: {
        tasks: ITask[]
    }
}

type GetProjects = {
    type: typeof GET_PROJECTS,
    payload: {
        projects: IProject[]
    }
}

export type DashboardActionType = 
    GetTasks |
    GetProjects