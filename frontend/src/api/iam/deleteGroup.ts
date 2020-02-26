import axios from 'axios'

const URL = '/api/iam/groups'

export function deleteGroup(ids: string[] | number[]) {
    return axios.delete(URL, {
        data: {
            ids
        }
    })
}