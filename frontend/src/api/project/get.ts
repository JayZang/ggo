import axios from 'axios'
import queryString from 'query-string'

import { IProject } from 'contracts/project'

const URL = '/api/projects'

export function get(option: {
    offset: number
    count: number
} & Partial<Record<keyof IProject, any>>) {
    return axios.get<{
        id: string
        name: string
        description: string | null
        start_datetime: string
        deadline_datetime: string
        finish_datetime: string | null
        quote: number | null
        source_type: number
        customer_id: number | null
        customer: Object | null
        remark: string | null
        create_at: string
    }[]>(`${URL}?${queryString.stringify(option)}`)
}