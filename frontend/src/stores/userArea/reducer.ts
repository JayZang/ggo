import { UserAreaState, UserAreaActionType, GET_TASK_LIST, GET_TASK_SIMPLE_STATISTIC, GET_TASK_INFO, ADD_TASK_WORK_REPORT, UPDATE_TASK_WORK_REPORT, GET_USER_PROJECT_SIMPLE_STATISTIC, GET_USER_PROJECT_LIST, GET_USER_PROJECT_DETAIL_INFO, FINISH_PROJECT, ADD_PROJECT_TASK, UPDATE_PROJECT_TASK_STATUS, GET_PROJECT_TASK_INFO } from './types'

const initState: UserAreaState = {
    projectPage: {
        default: {
            countOfTotal: 0,
            countOfFinished: 0,
            countOfProcessing: 0,
            projects: null
        },
        info: {
            project: null,
            tasks: null
        },
        taskInfo: null
    },
    taskPage: {
        default: {
            simpleStatistic: {
                countOfTotal: 0,
                countOfCompleted: 0,
                countOfProcessing: 0,
                countOfWorkReport: 0
            },
            listData: {
                totalCount: 0,
                data: null
            }
        },
        detail: {
            task: null
        }
    }
}

export default function taskReducer(state: UserAreaState = initState, action: UserAreaActionType): UserAreaState {
    switch (action.type) {
        case GET_USER_PROJECT_SIMPLE_STATISTIC:
            return {
                ...state,
                projectPage: {
                    ...state.projectPage,
                    default: {
                        ...state.projectPage.default,
                        ...action.payload
                    }
                }
            }

        case GET_USER_PROJECT_LIST:
            return {
                ...state,
                projectPage: {
                    ...state.projectPage,
                    default: {
                        ...state.projectPage.default,
                        projects: [
                            ...(state.projectPage.default.projects || []),
                            ...action.payload.projects
                        ]
                    }
                }
            }
            
        case GET_USER_PROJECT_DETAIL_INFO:
            return {
                ...state,
                projectPage: {
                    ...state.projectPage,
                    info: {
                        ...action.payload
                    }
                }
            }
            
        case FINISH_PROJECT:
            return {
                ...state,
                projectPage: {
                    ...state.projectPage,
                    default: {
                        ...state.projectPage.default,
                        projects: state.projectPage.default.projects && state.projectPage.default.projects.map(project => {
                            if (project.id == action.payload.projectId) return {
                                ...project,
                                finish_datetime: action.payload.date
                            }
                            return project
                        })
                    },
                    info: {
                        ...state.projectPage.info,
                        project: state.projectPage.info.project && state.projectPage.info.project.id == action.payload.projectId ? {
                            ...state.projectPage.info.project,
                            finish_datetime: action.payload.date
                        } : state.projectPage.info.project
                    }
                }
            }

        case ADD_PROJECT_TASK:
            return {
                ...state,
                projectPage: {
                    ...state.projectPage,
                    info: {
                        ...state.projectPage.info,
                        tasks: state.projectPage.info.tasks && [
                            ...state.projectPage.info.tasks,
                            action.payload.task
                        ]
                    }
                }
            }

        case UPDATE_PROJECT_TASK_STATUS:
            return {
                ...state,
                projectPage: {
                    ...state.projectPage,
                    info: {
                        ...state.projectPage.info,
                        tasks: state.projectPage.info.tasks && state.projectPage.info.tasks.map(task => {
                            if (task.id === action.payload.taskId) return {
                                ...task,
                                status: action.payload.status
                            }
                            return task
                        })
                    }
                }
            }

        case GET_PROJECT_TASK_INFO:
            return {
                ...state,
                projectPage: {
                    ...state.projectPage,
                    taskInfo: action.payload.task
                }
            }

        case GET_TASK_SIMPLE_STATISTIC:
            return {
                ...state,
                taskPage: {
                    ...state.taskPage,
                    default: {
                        ...state.taskPage.default,
                        simpleStatistic: {
                            ...action.payload
                        }
                    }
                }
            }

        case GET_TASK_LIST:
            return {
                ...state,
                taskPage: {
                    ...state.taskPage,
                    default: {
                        ...state.taskPage.default,
                        listData: {
                            totalCount: action.payload.totalCount,
                            data: action.payload.append && state.taskPage.default.listData.data ? [
                                ...state.taskPage.default.listData.data,
                                ...action.payload.data
                            ] : action.payload.data
                        }
                    }
                }
            }

        case GET_TASK_INFO:
            return {
                ...state,
                taskPage: {
                    ...state.taskPage,
                    detail: {
                        ...state.taskPage.detail,
                        task: action.payload.task
                    }
                }
            }

        case ADD_TASK_WORK_REPORT:
            return {
                ...state,
                taskPage: {
                    ...state.taskPage,
                    detail: {
                        ...state.taskPage.detail,
                        task: state.taskPage.detail.task && {
                            ...state.taskPage.detail.task,
                            workReports: [
                                action.payload.workReport,
                                ...(state.taskPage.detail.task.workReports || [])
                            ]
                        }
                    }
                }
            }

        case UPDATE_TASK_WORK_REPORT:
            return {
                ...state,
                taskPage: {
                    ...state.taskPage,
                    detail: {
                        ...state.taskPage.detail,
                        task: state.taskPage.detail.task && {
                            ...state.taskPage.detail.task,
                            workReports: (state.taskPage.detail.task.workReports || []).map(_workReport => {
                                if (_workReport.id === action.payload.workReport.id)
                                    return action.payload.workReport
                                return _workReport
                            })
                        }
                    }
                }
            }

        default:
            return state
    }
}