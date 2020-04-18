import axios from 'axios'

const URL = '/api/m/projects/:projectId/tasks/:taskId/status'

export function updateTaskStatus(projectId: string | number, taskId: string | number, status: number) {
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
    }>(URL
        .replace(':projectId', projectId.toString())
        .replace(':taskId', taskId.toString()
    ), {
        status
    })
}