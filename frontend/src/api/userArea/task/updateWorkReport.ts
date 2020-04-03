import axios from 'axios'

const URL = '/api/m/tasks/:taskId/work-report/:workReportId'

export function updateWorkReport(taskId: number, workReportId: number, data: any) {
    return axios.put<{
        id: number
        title: string
        content: string
        spend_time: string
        task_id: number
        submitter_id: number
        submit_from: number
        create_at: string
    }>(URL
            .replace(':taskId', taskId.toString())
            .replace(':workReportId', workReportId.toString()), 
        data)
}