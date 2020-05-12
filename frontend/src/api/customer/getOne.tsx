import axios from 'axios'

const URL = '/api/customers/:id'

export function getOne(id: number | string) {
    return axios.get<{
        id: string
        logo: string | null
        company_name: string
        contact: string
        phone: string
        email: string | null
        website: string | null
        address: string | null
        remark: string | null
        proejcts: Object
    }>(URL.replace(':id', id.toString()))
}