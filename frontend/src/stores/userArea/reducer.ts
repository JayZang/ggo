import _ from 'lodash'
import { UserAreaState, UserAreaActionType, GET_TASK_LIST, GET_TASK_SIMPLE_STATISTIC } from './types'

const initState: UserAreaState = {
    taskPage: {
        default: {
            simpleStatistic: {
                countOfTotal: 0,
                countOfCompleted: 0,
                countOfProcessing: 0
            },
            listData: {
                totalCount: 0,
                data: null
            }
        }
    }
}

export default function taskReducer(state: UserAreaState = initState, action: UserAreaActionType): UserAreaState {
    switch (action.type) {
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

        default:
            return state
    }
}