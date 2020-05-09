import axios from 'axios'

const URL = '/api/customers/:id'

export function remove(id: string | number) {
    return axios.delete<{
        logo: string | null
        company_name: string
        contact: string
        phone: string
        email: string | null
        website: string | null
        address: string | null
        remark: string | null
    }>(URL.replace(':id', id.toString()))
}