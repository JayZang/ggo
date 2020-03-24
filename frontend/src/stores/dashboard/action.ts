import { Dispatch } from "redux";

import * as userApi from 'api/user'
import { DashboardActionType, GET_TASKS } from "./types";
import { regularizeTaskData } from "stores/task/utils";

export const fetchUserTasks = () => async (dispatch : Dispatch) => {
   const res = await userApi.getTasks()

   const action: DashboardActionType = {
       type: GET_TASKS,
       payload: {
           tasks: res.data.map(task => regularizeTaskData(task))
       }
   }

   dispatch(action)
}