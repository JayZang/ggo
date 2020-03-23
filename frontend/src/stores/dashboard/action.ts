import { Dispatch } from "redux";

import * as userApi from 'api/user'
import { DashboardActionType, GET_TASKS } from "./types";
import { regularizeTaskData } from "stores/task/utils";

export const fetchUserTasks = () => async (dispatch : Dispatch) => {
   const res = await userApi.getTasks({
       offset: 0,
       count: 10
   })

   const action: DashboardActionType = {
       type: GET_TASKS,
       payload: {
           tasks: res.data.tasks.map(task => regularizeTaskData(task)),
           count: res.data.count
       }
   }

   dispatch(action)
}