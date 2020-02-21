import axios from 'axios'

const URL = '/api/auth/login'

export function login(account_id: string, password: string) {
    return axios.post<{
        id: string,
        account_id: string,
        line_id: string | null,
        status: 1,
        identity_type: 0,
        identity_id: 0,
        create_at: "2020-02-21T00:00:00.000Z",
        update_at: "2020-02-21T00:00:00.000Z"
    }>(URL, {
        account_id,
        password
    })
}