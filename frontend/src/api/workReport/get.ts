import axios from 'axios'

const URL = '/api/work-reports'

export function get(option: {
    offset: number
    count: number
}) {
    const {
        offset,
        count
    } = option
    
    return axios.get<{
        workReports: {
            id: number
            title: string
            content: string
            spend_time: string
            task_id: number
            submitter_id: number
            submit_from: number
            create_at: string
        }[],
        count: number
    }>(`${URL}?offset=${offset}&count=${count}`)
}