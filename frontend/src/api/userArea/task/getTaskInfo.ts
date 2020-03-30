import axios from 'axios'

const URL = '/api/m/tasks/:id'

export function getTaskInfo(id: number) {
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
    }>(URL.replace(':id', id.toString()))
}