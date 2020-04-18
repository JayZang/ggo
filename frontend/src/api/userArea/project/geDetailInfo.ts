import axios from 'axios'

const URL = '/api/m/projects/:id'

export function geDetailInfo(id: string | number) {
    return axios.get<{
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
    }>(URL.replace(':id', id.toString()))
}