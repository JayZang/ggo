import axios from 'axios'

const URL = '/api/iam/users'

export function registerUser(data: {
    account_id?: string
    identity_type: number
    identity_id: string | number
}) {
    return axios.post<Blob>(URL, data, {
        responseType: 'blob'
    })
}