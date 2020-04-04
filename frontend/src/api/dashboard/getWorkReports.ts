import axios from 'axios'

const URL = '/api/dashboard/work-reports'

export function getWorkReports() {
    return axios.get<{
        id: number
        title: string
        content: string
        spend_time: string
        task_id: number
        submitter_id: number
        submit_from: number
        create_at: string
    }[]>(URL)
}