import axios from 'axios'

const URL = '/api/members'

export function get(option: {
    offset: number
    count: number
}) {
    const {
        offset,
        count
    } = option

    return axios.get<{
            id: number
            name: string
            gender: number
            phone: string
            email: string
            birthday: string
            avatar: string | null
            take_office_date: string
            leave_office_date: string | null
            status: number
            create_at: string
            update_at: string
    }[]>(`${URL}?offset=${offset}&count=${count}`)
}