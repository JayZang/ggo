import axios from 'axios'
import { authTokenName } from 'config/httpHeader'

const URL = '/api/auth/check'

export function check(token: string) {
    return axios.get<{
        id: string
        account_id: string
        line_id: string | null
        status: number
        identity_type: number
        identity_id: number
        create_at: string
        update_at: string
    }>(URL, {
        headers: {
            [authTokenName]: token
        }
    })
}