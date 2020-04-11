import { ITask } from 'contracts/task'
import { IProject } from 'contracts/project'
import { IWorkReport } from 'contracts/workReport'

export const GET_DASHBOARD_TASKS = 'GET_DASHBOARD_TASKS'
export const GET_DASHBOARD_PROJECTS = 'GET_DASHBOARD_PROJECTS'
export const GET_DASHBOARD_WORK_REPORTS = 'GET_DASHBOARD_WORK_REPORTS'

export type DashboardState = {
    tasks: ITask[] | null
    projects: IProject[] | null
    workReports: IWorkReport[] | null
}

type GetTasks = {
    type: typeof GET_DASHBOARD_TASKS,
    payload: {
        tasks: ITask[]
    }
}

type GetProjects = {
    type: typeof GET_DASHBOARD_PROJECTS,
    payload: {
        projects: IProject[]
    }
}

type GetWorkReports = {
    type: typeof GET_DASHBOARD_WORK_REPORTS,
    payload: {
        workReports: IWorkReport[]
    }
}

export type DashboardActionType = 
    GetTasks |
    GetProjects |
    GetWorkReports