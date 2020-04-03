import axios from 'axios'

const URL = '/api/m/tasks/:id/work-report'

export function createWorkReport(taskId: number, data: any) {
    return axios.post<{
        id: number
        title: string
        content: string
        spend_time: string
        task_id: number
        submitter_id: number
        submit_from: number
        create_at: string
    }>(URL.replace(':id', taskId.toString()), data)
}