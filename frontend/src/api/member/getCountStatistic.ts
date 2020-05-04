import axios from 'axios'
import queryString from 'query-string'
import { IMember } from 'contracts/member'

const URL = '/api/members/count-statistic'

export function getCountStatistic(
    parameters: Partial<Record<keyof IMember, string | number>> = {}
) {
    return axios.get<{
        total: number,
        active: number,
        inactive: number,
    }>(`${URL}?${queryString.stringify(parameters)}`)
}