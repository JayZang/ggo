import axios from 'axios'

const URL = '/api/projects/:id/tasks'

export function getTasksByProjectId(id: string | number) {
    return axios.get<{
        id: string
        name: string
        description: string | null
        start_datetime: string
        deadline_datetime: string
        finish_datetime: string | null
        status: number
        project_id: number
        create_at: string
    }[]>(URL.replace(':id', id.toString()))
}