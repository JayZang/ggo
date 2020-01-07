import { TaskState, ADD_MEMBER_SELECTION_LIST, TaskActionType, CLEAR_MEMBER_SELECTION_LIST, ADD_TEAM_SELECTION_LIST, CLEAR_TEAM_SELECTION_LIST, UPDATE_TASK_STATUS, GET_PROJECT_TASKS } from "./types";
import _ from 'lodash'

const initState: TaskState = {
    tasksOfProject: null,
    editPanel: {
        members: null,
        teams: null
    }
}

export default function taskReducer(state: TaskState = initState, action: TaskActionType): TaskState {
    switch (action.type) {
        case GET_PROJECT_TASKS:
            return {
                ...state,
                tasksOfProject: action.payload.tasks
            }

        case UPDATE_TASK_STATUS:
            return {
                ...state,
                tasksOfProject: state.tasksOfProject && state.tasksOfProject.map(task => {
                    if (task.id == action.payload.taskId) {
                        const clonedTask = _.cloneDeep(task)
                        clonedTask.status = action.payload.status
                        return clonedTask
                    }
                    return task
                })
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