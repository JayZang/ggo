import axios from 'axios'

const URL = '/api/iam/groups'

export function createGroup(data: {
    name: string,
    description?: string,
    policy_ids: string[] | number[]
}) {
    return axios.post<{
        id: string | number
        name: string
        description: string | null
        create_at: string
    }>(URL, data)
}