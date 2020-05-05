import axios from 'axios'
import queryString from 'query-string'

import { IWorkReport } from 'contracts/workReport'

const URL = '/api/work-reports'

export function get(option: {
    offset: number
    count: number
} & Partial<Record<keyof IWorkReport, any>>) {
      return axios.get<{
        workReports: {
            id: number
            title: string
            content: string
            spend_time: string
            task_id: number
            submitter_id: number
            submit_from: number
            create_at: string
        }[],
        count: number
    }>(`${URL}?${queryString.stringify(option)}`)
}