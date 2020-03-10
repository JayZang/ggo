import axios from 'axios'

const URL = '/api/iam/users/:id/password'

export function resetUserPassword(id: string | number) {
    return axios.post<Blob>(URL.replace(':id', id.toString()), null, {
        responseType: 'blob'
    })
}