import { 
    TaskState, 
    TaskActionType, 
    GET_TASK_COUNT_STATISTIC, 
    GET_TASK_DETAIL_INFO, 
    GET_TASKS, 
    CLEAR_TASK_LIST_STATE
} from "./types";

const initState: TaskState = {
    listPage: {
        tasks: null,
        totalCount: 0
    },
    infoPage: {
        task: null
    }
}

export default function taskReducer(state: TaskState = initState, action: TaskActionType): TaskState {
    switch (action.type) {
        case GET_TASK_COUNT_STATISTIC:
            return {
                ...state,
                listPage: {
                    ...state.listPage,
                    totalCount: action.payload.totalCount
                }
            }

        case GET_TASKS:
            return {
                ...state,
                listPage: {
                    ...state.listPage,
                    tasks: [
                        ...(state.listPage.tasks || []),
                        ...action.payload.tasks
                    ]
                }
            }

        case CLEAR_TASK_LIST_STATE:
            return {
                ...state,
                listPage: {
                    ...initState.listPage
                }
            }

        case GET_TASK_DETAIL_INFO:
            return {
                ...state,
                infoPage: {
                    ...state.infoPage,
                    task: action.payload.task
                }
            }

        default:
            return state
    }
}