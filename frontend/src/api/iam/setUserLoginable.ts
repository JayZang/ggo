import axios from 'axios'

const URL = '/api/iam/users/:id/loginable'

export function setUserLoginable(id: string | number, loginable: boolean) {
    const httpMethod = loginable ? axios.post : axios.delete
    return httpMethod<{
        id: number | string
        account_id: string
        line_id: string | null
        loginable: boolean
        identity_type: number
        identity_id: string | number
        create_at: string
        update_at: string
    }>(URL.replace(':id', id.toString()))
}