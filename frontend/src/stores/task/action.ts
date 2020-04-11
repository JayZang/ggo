import { Dispatch } from "redux"

import { TaskActionType, UPDATE_TASK_STATUS, GET_TASK_COUNT_STATISTIC, GET_TASK_DETAIL_INFO, GET_TASKS, CLEAR_TASK_LIST_STATE, GET_TASK_EDIT_PANEL_TEAM_SELECTION, GET_TASK_EDIT_PANEL_MEMBER_SELECTION, ADD_TASK } from "./types"

import * as taskApi from 'api/task'
import * as teamApi from 'api/team'
import * as memberApi from 'api/member'
import { regularizeMemberData } from "stores/utils/regularizeMemberData"
import { regularizeTeamData } from "stores/utils/regularizeTeamData"
import { regularizeTaskData } from "stores/utils/regularizeTaskData"
import { TaskStatus } from "contracts/task"
import { RootState } from "stores"
import { MemberStatus } from "contracts/member"

export const fetchTaskCountStatistic = () => async (dispatch: Dispatch) => {
    const res = await taskApi.getCountStatistic()

    const action: TaskActionType = {
        type: GET_TASK_COUNT_STATISTIC,
        payload: {
            totalCount: res.data.totalCount
        }
   }

   dispatch(action)
}

export const fetchTasks = () => async (dispatch: Dispatch, getState: () => RootState) => {
    const { totalCount, tasks } = getState().task.listPage

    if (tasks && tasks.length >= totalCount)
        return

    const res = await taskApi.get({
        offset: tasks ? tasks.length : 0,
        count: 10
    })

    const action: TaskActionType = {
        type: GET_TASKS,
        payload: {
            tasks: res.data.map(task => regularizeTaskData(task))
        }
   }

   dispatch(action)
}

export const clearTaskListState = () => {
    return {
        type: CLEAR_TASK_LIST_STATE
    }
}

export const updateTaskStatus = (id: string | number, status: TaskStatus) => async (dispatch: Dispatch) => {
    const res = await taskApi.updateStatus(id, status)

    const action: TaskActionType = {
        type: UPDATE_TASK_STATUS,
        payload: {
            taskId: res.data.id,
            status
        }
   }

   dispatch(action)
}

export const createTask = (projectId: number | string, data: any) => async (dispatch: Dispatch) => {
    const res = await taskApi.create({
        project_id: projectId,
        ...data
    })

    const action: TaskActionType = {
        type: ADD_TASK,
        payload: {
            task: regularizeTaskData(res.data)
        }
    }

    dispatch(action)
}

export const fetchMemberSelection = () => async (dispatch : Dispatch) => {
    const res = await memberApi.get({
        offset: 0,
        count: 999,
        status: MemberStatus.active
    })
 
    const action: TaskActionType = {
        type: GET_TASK_EDIT_PANEL_MEMBER_SELECTION,
        payload: {
            members: res.data.members.map(member => regularizeMemberData(member))
        }
    }
 
    dispatch(action)
}


export const fetchTeamSelection = () => async (dispatch : Dispatch) => {
    const res = await teamApi.getPermanentTeams()
 
    const action: TaskActionType = {
        type: GET_TASK_EDIT_PANEL_TEAM_SELECTION,
        payload: {
            teams: res.data.map(team => regularizeTeamData(team))
        }
    }
 
    dispatch(action)
}

export const fetchTaskDetailInfo = (id: number | string) => async (dispatch: Dispatch) => {
    const res = await taskApi.getTetail(id)

    const action: TaskActionType = {
        type: GET_TASK_DETAIL_INFO,
        payload: {
            task: regularizeTaskData(res.data)
        }
    }

    dispatch(action)
}