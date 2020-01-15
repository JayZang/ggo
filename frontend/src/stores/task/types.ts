import { IMember } from 'contracts/member'
import { ITeam } from 'contracts/team'
import { TaskStatus, ITask } from 'contracts/task'

export const GET_TASK_COUNT_STATISTIC = 'GET_TASK_COUNT_STATISTIC'
export const ADD_TASKS_TO_LIST = 'ADD_TASKS_TO_LIST'
export const CLEAR_TASKS_LIST = 'CLEAR_TASKS_LIST'

export const GET_PROJECT_TASKS = 'GET_PROJECT_TASKS'
export const ADD_PROJECT_TASK = 'ADD_PROJECT_TASK'
export const CLEAR_PROJECT_TASK = 'CLEAR_PROJECT_TASK'

export const UPDATE_TASK_STATUS = 'UPDATE_TASK_STATUS'

export const ADD_MEMBER_SELECTION_LIST = 'ADD_MEMBER_SELECTION_LIST'
export const CLEAR_MEMBER_SELECTION_LIST = 'CLEAR_MEMBER_SELECTION_LIST'
export const ADD_TEAM_SELECTION_LIST = 'ADD_TEAM_SELECTION_LIST'
export const CLEAR_TEAM_SELECTION_LIST = 'CLEAR_TEAM_SELECTION_LIST'

export type TaskState = {
    taskList: ITask[] | null
    tasksOfProject: ITask[] | null
    editPanel: {
        members: IMember[] | null
        teams: ITeam[] | null
    },
    statistic: {
        totalCount: number
    }
}

type GetCountStatistic = {
    type: typeof GET_TASK_COUNT_STATISTIC,
    payload: {
        totalCount: number
    }
}

type AddTasksToList = {
    type: typeof ADD_TASKS_TO_LIST,
    payload: {
        tasks: ITask[]
    }
}

type ClearTaskList = {
    type: typeof CLEAR_TASKS_LIST
}

type GetProjectTasks = {
    type: typeof GET_PROJECT_TASKS,
    payload: {
        tasks: ITask[]
    }
}

type AddProjectTasks = {
    type: typeof ADD_PROJECT_TASK,
    payload: {
        task: ITask
    }
}

type ClearProjectTasks = {
    type: typeof CLEAR_PROJECT_TASK,
}

type UpdateTaskStatus = {
    type: typeof UPDATE_TASK_STATUS
    payload: {
        taskId: string | number
        status: TaskStatus
    }
}

type AddMemberSelectionList = {
    type: typeof ADD_MEMBER_SELECTION_LIST
    payload: {
        members: IMember[]
    }
}

type ClearMemberSelectionList = {
    type: typeof CLEAR_MEMBER_SELECTION_LIST
}

type AddTeamSelectionList = {
    type: typeof ADD_TEAM_SELECTION_LIST
    payload: {
        teams: ITeam[]
    }
}

type ClearTeamSelectionList = {
    type: typeof CLEAR_TEAM_SELECTION_LIST
}

export type TaskActionType = 
    GetCountStatistic |
    AddTasksToList |
    ClearTaskList |
    GetProjectTasks |
    AddProjectTasks |
    ClearProjectTasks |
    UpdateTaskStatus |
    AddMemberSelectionList | 
    ClearMemberSelectionList |
    AddTeamSelectionList |
    ClearTeamSelectionList