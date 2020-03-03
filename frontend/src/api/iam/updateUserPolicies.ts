import axios from 'axios'

const URL = '/api/iam/users/:id/policies'

export function updateUserPolicies(id: string | number, data: {
    policyIds: string[] | number[]
    groupIds: string[] | number[]
}) {

    return axios.post<{
        id: number | string
        account_id: string
        line_id: string | null
        loginable: boolean
        identity_type: number
        identity_id: string | number
        create_at: string
        update_at: string
    }>(URL.replace(':id', id.toString()), data)
}