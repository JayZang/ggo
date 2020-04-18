import axios from 'axios'

const URL = '/api/m/projects/:id/tasks'

export function createTask(id: number | string, data: {
    name: string
    description?: string
    start_datetime: string
    deadline_datetime: string
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
    }>(URL.replace(':id', id.toString()), data)
}