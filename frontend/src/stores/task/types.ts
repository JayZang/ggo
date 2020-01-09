import { IMember } from 'contracts/member'
import { ITeam } from 'contracts/team'
import { TaskStatus, ITask } from 'contracts/task'

export const GET_PROJECT_TASKS = 'GET_PROJECT_TASKS'
export const ADD_PROJECT_TASK = 'ADD_PROJECT_TASK'
export const UPDATE_TASK_STATUS = 'UPDATE_TASK_STATUS'
export const ADD_MEMBER_SELECTION_LIST = 'ADD_MEMBER_SELECTION_LIST'
export const CLEAR_MEMBER_SELECTION_LIST = 'CLEAR_MEMBER_SELECTION_LIST'
export const ADD_TEAM_SELECTION_LIST = 'ADD_TEAM_SELECTION_LIST'
export const CLEAR_TEAM_SELECTION_LIST = 'CLEAR_TEAM_SELECTION_LIST'

export type TaskState = {
    tasksOfProject: ITask[] | null
    editPanel: {
        members: IMember[] | null
        teams: ITeam[] | null
    }
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
    GetProjectTasks |
    AddProjectTasks |
    UpdateTaskStatus |
    AddMemberSelectionList | 
    ClearMemberSelectionList |
    AddTeamSelectionList |
    ClearTeamSelectionList