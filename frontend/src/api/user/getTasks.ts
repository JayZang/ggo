import axios from 'axios'

const URL = '/api/user/tasks'

export function getTasks() {
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
    }[]>(URL)
}