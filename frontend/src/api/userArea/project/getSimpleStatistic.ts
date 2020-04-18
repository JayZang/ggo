import axios from 'axios'

const URL = '/api/m/projects/simple-statistic'

export function getSimpleStatistic() {
    return axios.get<{
        countOfTotal: number
        countOfFinished: number
        countOfProcessing: number
    }>(URL)
}