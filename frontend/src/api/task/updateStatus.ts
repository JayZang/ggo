import axios from 'axios'

const URL = '/api/tasks/:id/status'

export function updateStatus(id: string | number, status: number) {
    return axios.post<{
        id: number
        name: string
        description: string | null
        start_datetime: string
        deadline_datetime: string
        finish_datetime: string | null
        project_id: number | string
        remark: string | null
        create_at: string
    }>(URL.replace(':id', id.toString()), {
        status
    })
}