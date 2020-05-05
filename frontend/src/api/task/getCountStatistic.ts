import axios from 'axios'
import queryString from 'query-string'

import { ITask } from 'contracts/task'

const URL = '/api/tasks/count-statistic'

export function getCountStatistic(
    query: Partial<Record<keyof ITask, any>> = {}
) {
    return axios.get<{
        totalCount: number
    }>(`${URL}?${queryString.stringify(query)}`)
}