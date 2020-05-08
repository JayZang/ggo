import axios from 'axios'

const URL = '/api/customers/industry-categories'

export function getIndustryCategories() {
    return axios.get<{
        id: string | number
        name: string
    }[]>(URL)
}