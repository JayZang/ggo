import axios from 'axios'

const URL = '/api/projects/:id'

export function update(id: string | number, data: {
    name: string
    description?: string
    start_datetime: string
    deadline_datetime: string
    quote?: number
    source_type: number
    customer_id?: number
    remark?: string
}) {
    return axios.put<{
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
    }>(URL.replace(':id', id.toString()), data)
}