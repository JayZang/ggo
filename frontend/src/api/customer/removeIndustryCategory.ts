import axios from 'axios'

const URL = '/api/customers/industry-categories/:id'

export function removeIndustryCategory(id: number | string) {
    return axios.delete<{
        name: string
    }>(URL.replace(':id', id.toString()))
}