import axios from 'axios'

const URL = '/api/tasks'

export function get(option: {
    offset: number
    count: number
}) {
    const {
        offset,
        count
    } = option

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
    }[]>(`${URL}?offset=${offset}&count=${count}`)
}