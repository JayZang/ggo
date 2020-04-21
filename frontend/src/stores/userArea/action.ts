import { Dispatch } from "redux";

import * as userAreaTaskApi from 'api/userArea/task'
import * as userProjectApi from 'api/userArea/project'
import { regularizeTaskData } from "stores/utils/regularizeTaskData";
import { UserAreaActionType, GET_TASK_LIST, GET_TASK_SIMPLE_STATISTIC, GET_TASK_INFO, ADD_TASK_WORK_REPORT, UPDATE_TASK_WORK_REPORT, GET_USER_PROJECT_SIMPLE_STATISTIC, GET_USER_PROJECT_LIST, GET_USER_PROJECT_DETAIL_INFO, FINISH_PROJECT, ADD_PROJECT_TASK, UPDATE_PROJECT_TASK_STATUS, GET_PROJECT_TASK_INFO } from "./types";
import { RootState } from "stores";
import { regularizeWorkReportData } from "stores/utils/regularizeWorkReportData";
import { regularizeProjectData } from "stores/utils/regularizeProjectData";
import { Moment } from "moment";
import { TaskStatus, ITask } from "contracts/task";

/**
 * My Project Management
 */

export const fetchProjectSimpleStatistic = () => async (dispatch: Dispatch) => {
    const res = await userProjectApi.getSimpleStatistic()

    const action: UserAreaActionType = {
        type: GET_USER_PROJECT_SIMPLE_STATISTIC,
        payload: {
            ...res.data
        }
    }

    dispatch(action)
}

export const fetchProjects = () => async (dispatch: Dispatch, getState: () => RootState) => {
    const { projects, countOfTotal } = getState().userArea.projectPage.default

    if (projects && projects.length >= countOfTotal)
        return

    const res = await userProjectApi.get({
        count: 10,
        offset: projects ? projects.length : 0
    })

    const action: UserAreaActionType = {
        type: GET_USER_PROJECT_LIST,
        payload: {
            projects: res.data.map(project => regularizeProjectData(project)),
        }
    }

    dispatch(action)
}

export const fetchProjectDetailInfo = (id: number | string) => async (dispatch: Dispatch) => {
    const res = await userProjectApi.geDetailInfo(id)

    const project = regularizeProjectData(res.data)
    const action: UserAreaActionType = {
        type: GET_USER_PROJECT_DETAIL_INFO,
        payload: {
            project,
            tasks: project.tasks || []
        }
    }

    dispatch(action)
}

export const finishProject = (id: number | string, date: Moment) => async (dispatch: Dispatch) => {
    await userProjectApi.finish(id, date.toString())

    const action: UserAreaActionType = {
        type: FINISH_PROJECT,
        payload: {
            projectId: id,
            date 
        }
    }

    dispatch(action)
}

export const createTask = (projectId: number | string, data: any) => async (dispatch: Dispatch) => {
    const res = await userProjectApi.createTask(projectId, {
        ...data
    })

    const action: UserAreaActionType = {
        type: ADD_PROJECT_TASK,
        payload: {
            task: regularizeTaskData(res.data)
        }
    }

    dispatch(action)
}

export const updateTaskStatus = (task: ITask, status: TaskStatus) => async (dispatch: Dispatch) => {
    const res = await userProjectApi.updateTaskStatus(task.project_id, task.id, status)

    const action: UserAreaActionType = {
        type: UPDATE_PROJECT_TASK_STATUS,
        payload: {
            taskId: res.data.id,
            status
        }
   }

   dispatch(action)
}

export const fetchProjectTaskInfo = (projectId: number | string, taskId: number | string) => async (dispatch: Dispatch) => {
    const res = await userProjectApi.getTaskInfo(projectId, taskId)

    const action: UserAreaActionType = {
        type: GET_PROJECT_TASK_INFO,
        payload: {
            task: regularizeTaskData(res.data)
        }
   }

   dispatch(action)
}


/**
 * My Tasks
 */

export const fetchTaskSimpleStatistic = () => async (dispatch: Dispatch) => {
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

export const createWorkReport = (taskId: number, data: any) => async (dispatch: Dispatch) => {
    const res = await userAreaTaskApi.createWorkReport(taskId, data)

    const action: UserAreaActionType = {
        type: ADD_TASK_WORK_REPORT,
        payload: {
            workReport: regularizeWorkReportData(res.data)
        }
    }

    dispatch(action)
}

export const updateWorkReport = (taskId: number, workReportId: number, data: any) => async (dispatch: Dispatch) => {
    const res = await userAreaTaskApi.updateWorkReport(taskId, workReportId, data)

    const action: UserAreaActionType = {
        type: UPDATE_TASK_WORK_REPORT,
        payload: {
            workReport: regularizeWorkReportData(res.data)
        }
    }

    dispatch(action)
}