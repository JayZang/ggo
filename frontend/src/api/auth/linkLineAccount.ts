import axios from 'axios'

const URL = '/api/auth/line/account-link'

export function linkLineAccount(account_id: string, password: string) {
    return axios.post<{
        nonce: string
    }>(URL, {
        account_id,
        password
    })
}