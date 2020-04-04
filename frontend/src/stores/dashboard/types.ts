import { ITask } from 'contracts/task'
import { IProject } from 'contracts/project'
import { IWorkReport } from 'contracts/workReport'

export const GET_TASKS = 'GET_TASKS'
export const GET_PROJECTS = 'GET_PROJECTS'
export const GET_WORK_REPORTS = 'GET_WORK_REPORTS'

export type DashboardState = {
    tasks: ITask[] | null
    projects: IProject[] | null
    workReports: IWorkReport[] | null
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

type GetWorkReports = {
    type: typeof GET_WORK_REPORTS,
    payload: {
        workReports: IWorkReport[]
    }
}

export type DashboardActionType = 
    GetTasks |
    GetProjects |
    GetWorkReports