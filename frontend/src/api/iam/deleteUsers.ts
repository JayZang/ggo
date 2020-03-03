import axios from 'axios'

const URL = '/api/iam/users'

export function deleteUsers(ids: string[] | number[]) {
    return axios.delete(URL, { 
        data: {
            ids
        }
     })
}