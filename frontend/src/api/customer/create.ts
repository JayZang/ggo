import axios from 'axios'

const URL = '/api/customers'

export function create(data: {
    logo?: File
    company_name: string
    contact: string
    phone: string
    email?: string
    website?: string
    address?: string
    remark?: string
}) {
    const formData = new FormData()
    Object.keys(data).forEach(key => {
        const value = (data as any)[key]
        value !== undefined && formData.append(key, value)
    })

    return axios.post<{
        id: string
        logo: string | null
        company_name: string
        contact: string
        phone: string
        email: string | null
        website: string | null
        address: string | null
        remark: string | null
    }>(URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}