import axios from 'axios'

const URL = '/api/customers'

export function get() {
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
    }[]>(URL)
}