import axios from 'axios'

const URL = '/api/m/projects/:id/finish'

export function finish(id: string | number, date: string) {
    return axios.post<{
        id: string
        name: string
        description: string | null
        start_datetime: string
        deadline_datetime: string
        finish_datetime: string | null
        quote: number | null
        source_type: number
        customer_id: number | null
        customer: Object | null
        remark: string | null
        create_at: string
    }>(URL.replace(':id', id.toString()), { date })
}