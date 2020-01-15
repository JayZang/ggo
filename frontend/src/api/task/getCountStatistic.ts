import axios from 'axios'

const URL = '/api/tasks/count-statistic'

export function getCountStatistic() {
    return axios.get<{
        totalCount: number
    }>(URL)
}