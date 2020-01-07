import axios from 'axios'

const URL = '/api/tasks'

export function create(data: {
    name: string
    description?: string
    start_datetime: string
    deadline_datetime: string
    project_id: number | string
    remarks?: string
}) {
    return axios.post<{
        id: string
        name: string
        description: string | null
        start_datetime: string
        deadline_datetime: string
        finish_datetime: string | null
        project_id: number | string
        remark: string | null
        create_at: string
    }>(URL, data)
}