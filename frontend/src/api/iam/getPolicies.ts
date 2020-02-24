import axios from 'axios'

const URL = '/api/iam/policies'

export function getPolicies() {
    return axios.get<{
        id: string | number
        name: string
        description: string | null
        variable_name: string
        create_at: string
    }[]>(URL)
}