import { ITeam } from 'contracts/team'
import { IMember } from 'contracts/member'
import { TaskStatus, ITask } from 'contracts/task'

export const GET_TASK_COUNT_STATISTIC = 'GET_TASK_COUNT_STATISTIC'
export const GET_TASKS = 'GET_TASKS'
export const ADD_TASK = 'ADD_TASK'
export const CLEAR_TASK_LIST_STATE = 'CLEAR_TASK_LIST_STATE'

export const UPDATE_TASK_STATUS = 'UPDATE_TASK_STATUS'
export const GET_TASK_DETAIL_INFO = 'GET_TASK_DETAIL_INFO'

export const GET_TASK_EDIT_PANEL_MEMBER_SELECTION = 'GET_TASK_EDIT_PANEL_MEMBER_SELECTION'
export const GET_TASK_EDIT_PANEL_TEAM_SELECTION = 'GET_TASK_EDIT_PANEL_TEAM_SELECTION'

export type TaskState = {
    listPage: {
        tasks: ITask[] | null
        totalCount: number
    }

    infoPage: {
        task: ITask | null
    }

    editPanel: {
        memberSelection: IMember[] | null
        teamSelection: ITeam[] | null
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

type AddTask = {
    type: typeof ADD_TASK,
    payload: {
        task: ITask
    }
}

type ClearTaskListState = {
    type: typeof CLEAR_TASK_LIST_STATE
}

type UpdateTaskStatus = {
    type: typeof UPDATE_TASK_STATUS
    payload: {
        taskId: string | number
        status: TaskStatus
    }
}

type GetMemberSelectionList = {
    type: typeof GET_TASK_EDIT_PANEL_MEMBER_SELECTION
    payload: {
        members: IMember[]
    }
}

type GetTeamSelectionList = {
    type: typeof GET_TASK_EDIT_PANEL_TEAM_SELECTION
    payload: {
        teams: ITeam[]
    }
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
    AddTask |
    ClearTaskListState |
    UpdateTaskStatus |
    GetMemberSelectionList | 
    GetTeamSelectionList |
    GetTaskDetailInfo