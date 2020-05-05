import axios from 'axios'
import queryString from 'query-string'

import { ITask } from 'contracts/task'

const URL = '/api/tasks'

export function get(option: {
    offset: number
    count: number
} & Partial<Record<keyof ITask, any>>) {
    return axios.get<{
        id: string
        name: string
        description: string | null
        start_datetime: string
        deadline_datetime: string
        finish_datetime: string | null
        project_id: number | string
        remark: string | null
        create_at: string
    }[]>(`${URL}?${queryString.stringify(option)}`)
}