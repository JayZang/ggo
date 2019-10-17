import axios from 'axios'

const URL = '/api/members/:id'

export function getBaseInfo(id: number | string) {
    return axios.get<{
        id: number
        name: string
        gender: number
        phone: string
        email: string
        birthday: string
        avatar: string | null
        status: number
        take_office_date: string
        leave_office_date: string | null
        create_at: string
        update_at: string
    }>(URL.replace(':id', id.toString()))
}