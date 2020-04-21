import { ITask, TaskStatus } from 'contracts/task'
import { IWorkReport } from 'contracts/workReport'
import { IProject } from 'contracts/project'
import { Moment } from 'moment'

export const GET_USER_PROJECT_SIMPLE_STATISTIC = 'GET_USER_PROJECT_SIMPLE_STATISTIC'
export const GET_USER_PROJECT_LIST = 'GET_USER_PROJECT_LIST'
export const GET_USER_PROJECT_DETAIL_INFO = 'GET_USER_PROJECT_DETAIL_INFO'
export const FINISH_PROJECT = 'FINISH_PROJECT'
export const ADD_PROJECT_TASK = 'ADD_PROJECT_TASK'
export const UPDATE_PROJECT_TASK_STATUS = 'UPDATE_PROJECT_TASK_STATUS'
export const GET_PROJECT_TASK_INFO = 'GET_PROJECT_TASK_INFO'

export const GET_TASK_SIMPLE_STATISTIC = 'GET_TASK_SIMPLE_STATISTIC'
export const GET_TASK_LIST = 'GET_TASK_LIST'
export const GET_TASK_INFO = 'GET_TASK_INFO'
export const ADD_TASK_WORK_REPORT = 'ADD_TASK_WORK_REPORT'
export const UPDATE_TASK_WORK_REPORT = 'UPDATE_TASK_WORK_REPORT'

export type UserAreaState = {
    projectPage: {
        default: {
            countOfTotal: number
            countOfFinished: number
            countOfProcessing: number
            projects: IProject[] | null
        }
        info: {
            project: IProject | null
            tasks: ITask[] | null
        }
        taskInfo: ITask | null
    }
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

type GetProjectSimpleStatistic = {
    type: typeof GET_USER_PROJECT_SIMPLE_STATISTIC
    payload: {
        countOfTotal: number
        countOfFinished: number
        countOfProcessing: number
    }
}

type GetProjectList = {
    type: typeof GET_USER_PROJECT_LIST
    payload: {
        projects: IProject[]
    }
}

type GetProjectDetailInfo = {
    type: typeof GET_USER_PROJECT_DETAIL_INFO
    payload: {
        project: IProject
        tasks: ITask[]
    }
}

type FinishProject = {
    type: typeof FINISH_PROJECT
    payload: {
        projectId: number | string
        date: Moment
    }
}

type AddProjectTask = {
    type: typeof ADD_PROJECT_TASK
    payload: {
        task: ITask
    }
}

type UpdateProjectTaskStatus = {
    type: typeof UPDATE_PROJECT_TASK_STATUS
    payload: {
        taskId: number
        status: TaskStatus
    }
}

type GetProjectTaskInfo = {
    type: typeof GET_PROJECT_TASK_INFO
    payload: {
        task: ITask
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
    GetProjectSimpleStatistic |
    GetProjectList |
    GetProjectDetailInfo |
    FinishProject |
    AddProjectTask |
    UpdateProjectTaskStatus |
    GetProjectTaskInfo |
    GetTaskSimpleStatistic |
    GetTaskList |
    GetTaskInfo |
    AddTaskWorkReport |
    UpdateTaskWorkReport