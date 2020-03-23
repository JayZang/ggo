import axios from 'axios'

const URL = '/api/user/tasks'

export function getTasks(option: {
    offset: number
    count: number
}) {
    const {
        offset,
        count
    } = option

    return axios.get<{
        tasks: {
            id: string
            name: string
            description: string | null
            start_datetime: string
            deadline_datetime: string
            finish_datetime: string | null
            project_id: number | string
            remark: string | null
            create_at: string
        }[],
        count: number
    }>(`${URL}?offset=${offset}&count=${count}`)
}