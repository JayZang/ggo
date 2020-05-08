import axios from 'axios'

const URL = '/api/customers/industry-categories'

export function createIndustryCategories(data: any) {
    return axios.post<{
        id: string | number
        name: string
    }>(URL, data)
}