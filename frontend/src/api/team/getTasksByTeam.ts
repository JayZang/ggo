import axios from 'axios'

const URL = '/api/teams/:id/tasks'

export function getTasksByTeam(id: string | number, option: {
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
    }>(`${URL.replace(':id', id.toString())}?offset=${offset}&count=${count}`)
}