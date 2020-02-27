import axios from 'axios'

const URL = '/api/iam/groups/:id'

export function updateGroup(id: string | number, data: {
    name: string,
    description?: string,
    policy_ids: string[] | number[]
}) {
    return axios.put<{
        id: string | number
        name: string
        description: string | null
        create_at: string
    }>(URL.replace(':id', id.toString()), data)
}