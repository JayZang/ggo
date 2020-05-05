import axios from 'axios'
import queryString from 'query-string'

import { IProject } from 'contracts/project'

const URL = '/api/projects/count-statistic'

export function getCountStatistic(query: Partial<Record<keyof IProject, any>> = {}) {
    return axios.get<{
        totalCount: number
        srcTypeInternalCount: number
        srcTypeCustomerCount: number
    }>(`${URL}?${queryString.stringify(query)}`)
}