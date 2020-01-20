import axios from 'axios'

const URL = '/api/members/count-statistic'

export function getCountStatistic() {
    return axios.get<{
        total: number,
        active: number,
        inactive: number,
    }>(URL)
}