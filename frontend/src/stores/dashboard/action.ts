import { Dispatch } from "redux";

import * as dashboardApi from 'api/dashboard'
import { DashboardActionType, GET_TASKS, GET_PROJECTS } from "./types";
import { regularizeTaskData } from "stores/task/utils";
import { regularizeProjectData } from "stores/project/utils";

export const fetTasks = () => async (dispatch : Dispatch) => {
   const res = await dashboardApi.getTasks()

   const action: DashboardActionType = {
       type: GET_TASKS,
       payload: {
           tasks: res.data.map(task => regularizeTaskData(task))
       }
   }

   dispatch(action)
}

export const fetchProjects = () => async (dispatch : Dispatch) => {
   const res = await dashboardApi.getProjects()

   const action: DashboardActionType = {
       type: GET_PROJECTS,
       payload: {
           projects: res.data.map(project => regularizeProjectData(project))
       }
   }

   dispatch(action)
}