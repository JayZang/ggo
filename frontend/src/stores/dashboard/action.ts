import { Dispatch } from "redux";

import * as dashboardApi from 'api/dashboard'
import { DashboardActionType, GET_DASHBOARD_TASKS, GET_DASHBOARD_PROJECTS, GET_DASHBOARD_WORK_REPORTS } from "./types";
import { regularizeTaskData } from "stores/utils/regularizeTaskData";
import { regularizeProjectData } from "stores/utils/regularizeProjectData";
import { regularizeWorkReportData } from "stores/utils/regularizeWorkReportData";

export const fetTasks = () => async (dispatch : Dispatch) => {
   const res = await dashboardApi.getTasks()

   const action: DashboardActionType = {
       type: GET_DASHBOARD_TASKS,
       payload: {
           tasks: res.data.map(task => regularizeTaskData(task))
       }
   }

   dispatch(action)
}

export const fetchProjects = () => async (dispatch : Dispatch) => {
   const res = await dashboardApi.getProjects()

   const action: DashboardActionType = {
       type: GET_DASHBOARD_PROJECTS,
       payload: {
           projects: res.data.map(project => regularizeProjectData(project))
       }
   }

   dispatch(action)
}

export const fetchWorkReports = () => async (dispatch : Dispatch) => {
   const res = await dashboardApi.getWorkReports()

   const action: DashboardActionType = {
       type: GET_DASHBOARD_WORK_REPORTS,
       payload: {
           workReports: res.data.map(workReport => regularizeWorkReportData(workReport))
       }
   }

   dispatch(action)
}