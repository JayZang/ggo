import axios from 'axios'

const URL = '/api/projects/:projectId/manager/:memberId'

export function addManager(projectId: number | string, memberId: number | string) {
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
    }>(URL
        .replace(':projectId', projectId.toString())
        .replace(':memberId', memberId.toString())
    )
}