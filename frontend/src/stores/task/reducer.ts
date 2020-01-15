import { TaskState, ADD_MEMBER_SELECTION_LIST, TaskActionType, CLEAR_MEMBER_SELECTION_LIST, ADD_TEAM_SELECTION_LIST, CLEAR_TEAM_SELECTION_LIST, UPDATE_TASK_STATUS, GET_PROJECT_TASKS, ADD_PROJECT_TASK, CLEAR_PROJECT_TASK, ADD_TASKS_TO_LIST, CLEAR_TASKS_LIST, GET_TASK_COUNT_STATISTIC } from "./types";
import _ from 'lodash'

const initState: TaskState = {
    taskList: null,
    tasksOfProject: null,
    editPanel: {
        members: null,
        teams: null
    },
    statistic: {
        totalCount: 0
    }
}

export default function taskReducer(state: TaskState = initState, action: TaskActionType): TaskState {
    switch (action.type) {
        case GET_TASK_COUNT_STATISTIC:
            return {
                ...state,
                statistic: {
                    totalCount: action.payload.totalCount
                }
            }

        case ADD_TASKS_TO_LIST:
            return {
                ...state,
                taskList: [
                    ...(state.taskList || []),
                    ...action.payload.tasks
                ]
            }

        case CLEAR_TASKS_LIST:
            return {
                ...state,
                taskList: null
            }

        case GET_PROJECT_TASKS:
            return {
                ...state,
                tasksOfProject: action.payload.tasks
            }

        case ADD_PROJECT_TASK:
            return {
                ...state,
                tasksOfProject: [
                    action.payload.task,
                    ...(state.tasksOfProject || [])
                ]
            }

        case UPDATE_TASK_STATUS:
            return {
                ...state,
                taskList: state.taskList && state.taskList.map(task => {
                    if (task.id == action.payload.taskId) {
                        const clonedTask = _.cloneDeep(task)
                        clonedTask.status = action.payload.status
                        return clonedTask
                    }
                    return task
                }),
                tasksOfProject: state.tasksOfProject && state.tasksOfProject.map(task => {
                    if (task.id == action.payload.taskId) {
                        const clonedTask = _.cloneDeep(task)
                        clonedTask.status = action.payload.status
                        return clonedTask
                    }
                    return task
                })
            }

        case CLEAR_PROJECT_TASK:
            return {
                ...state,
                tasksOfProject: null
            }

        case ADD_MEMBER_SELECTION_LIST:
            return {
                ...state,
                editPanel: {
                    ...state.editPanel,
                    members: action.payload.members
                }
            }

        case CLEAR_MEMBER_SELECTION_LIST:
            return {
                ...state,
                editPanel: {
                    ...state.editPanel,
                    members: null
                }
            }

        case ADD_TEAM_SELECTION_LIST:
            return {
                ...state,
                editPanel: {
                    ...state.editPanel,
                    teams: action.payload.teams
                }
            }

        case CLEAR_TEAM_SELECTION_LIST:
            return {
                ...state,
                editPanel: {
                    ...state.editPanel,
                    teams: null
                }
            }

        default:
            return state
    }
}