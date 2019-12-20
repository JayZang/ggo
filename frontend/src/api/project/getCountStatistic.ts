import axios from 'axios'

const URL = '/api/projects/count-statistic'

export function getCountStatistic() {
    return axios.get<{
        totalCount: number
        srcTypeInternalCount: number
        srcTypeCustomerCount: number
    }>(URL)
}