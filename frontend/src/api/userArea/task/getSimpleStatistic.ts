import axios from 'axios'

const URL = '/api/m/tasks/simple-statistic'

export function getSimpleStatistic() {
    return axios.get<{
        countOfTotal: number
        countOfCompleted: number
        countOfProcessing: number
    }>(URL)
}