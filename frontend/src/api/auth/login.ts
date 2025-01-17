import axios from 'axios'

const URL = '/api/auth/login'

export function login(account_id: string, password: string) {
    return axios.post<{
        id: string
        account_id: string
        line_id: string | null
        status: number
        identity_type: number
        identity_id: number
        create_at: string
        update_at: string
    }>(URL, {
        account_id,
        password
    })
}