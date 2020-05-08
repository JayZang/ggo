import axios from 'axios'

const URL = '/api/customers/industry-categories/:id'

export function updateIndustryCategory(id: number | string, data: any) {
    return axios.put<{
        id: string | number
        name: string
    }>(URL.replace(':id', id.toString()), data)
}