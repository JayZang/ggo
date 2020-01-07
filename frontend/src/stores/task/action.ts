import { Dispatch } from "redux"

import { ADD_MEMBER_SELECTION_LIST, TaskActionType, CLEAR_MEMBER_SELECTION_LIST, ADD_TEAM_SELECTION_LIST, CLEAR_TEAM_SELECTION_LIST, GET_PROJECT_TASKS, UPDATE_TASK_STATUS } from "./types"

import * as memberApi from 'api/member'
import * as teamApi from 'api/team'
import * as projectApi from 'api/project'
import * as taskApi from 'api/task'
import { regularizeMemberData } from "stores/member/utils"
import { regularizeTeamData } from "stores/team/utils"
import { regularizeTaskData } from "./utils"
import { TaskStatus } from "contracts/task"

export const fetchProjectTasks = (id: string) => async (dispatch: Dispatch) => {
    const res = await projectApi.getTasksByProjectId(id)

    const action: TaskActionType = {
        type: GET_PROJECT_TASKS,
        payload: {
            tasks: res.data.map(task => regularizeTaskData(task))
        }
   }

   dispatch(action)
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

export const fetchMemberSelection = () => async (dispatch : Dispatch) => {
    const res = await memberApi.all()
 
    const action: TaskActionType = {
        type: ADD_MEMBER_SELECTION_LIST,
        payload: {
            members: res.data.map(member => regularizeMemberData(member))
        }
    }
 
    dispatch(action)
}

export const clearMemberSelection = () => {
    const action: TaskActionType = {
        type: CLEAR_MEMBER_SELECTION_LIST
    }
 
   return action
}

export const fetchTeamSelection = () => async (dispatch : Dispatch) => {
    const res = await teamApi.getPermanentTeams()
 
    const action: TaskActionType = {
        type: ADD_TEAM_SELECTION_LIST,
        payload: {
            teams: res.data.map(team => regularizeTeamData(team))
        }
    }
 
    dispatch(action)
}

export const clearTeamSelection = () => {
    const action: TaskActionType = {
        type: CLEAR_TEAM_SELECTION_LIST
    }
 
   return action
}