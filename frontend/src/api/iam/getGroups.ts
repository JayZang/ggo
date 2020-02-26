import axios from 'axios'

const URL = '/api/iam/groups'

export function getGroups() {
    return axios.get<{
        id: string | number
        name: string
        description: string | null
        create_at: string
    }[]>(URL)
}