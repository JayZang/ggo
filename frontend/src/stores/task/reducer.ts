import { 
    TaskState, 
    TaskActionType, 
    UPDATE_TASK_STATUS, 
    GET_TASK_COUNT_STATISTIC, 
    GET_TASK_DETAIL_INFO, 
    GET_TASKS, ADD_TASK, 
    CLEAR_TASK_LIST_STATE, 
    GET_TASK_EDIT_PANEL_MEMBER_SELECTION, 
    GET_TASK_EDIT_PANEL_TEAM_SELECTION 
} from "./types";

const initState: TaskState = {
    listPage: {
        tasks: null,
        totalCount: 0
    },
    infoPage: {
        task: null
    },
    editPanel: {
        memberSelection: null,
        teamSelection: null
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

        case ADD_TASK:
            return {
                ...state,
                listPage: {
                    ...state.listPage,
                    tasks: state.listPage.tasks && [
                        action.payload.task,
                        ...state.listPage.tasks
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

        case UPDATE_TASK_STATUS:
            return {
                ...state,
                listPage:{
                    ...state.listPage,
                    tasks: state.listPage.tasks && state.listPage.tasks.map(task => {
                        if (task.id === action.payload.taskId) return {
                            ...task,
                            status: action.payload.status
                        }
                        return task
                    })
                }
            }

        case GET_TASK_EDIT_PANEL_MEMBER_SELECTION:
            return {
                ...state,
                editPanel: {
                    ...state.editPanel,
                    memberSelection: action.payload.members
                }
            }

        case GET_TASK_EDIT_PANEL_TEAM_SELECTION:
            return {
                ...state,
                editPanel: {
                    ...state.editPanel,
                    teamSelection: action.payload.teams
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