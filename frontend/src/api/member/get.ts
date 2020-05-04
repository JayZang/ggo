import axios from 'axios'
import queryString from 'query-string'
import { IMember } from 'contracts/member'

const URL = '/api/members'

export function get(option: {
    offset: number
    count: number
} & Partial<Record<keyof IMember, string | number>>) {
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
    }[]>(`${URL}?${queryString.stringify(option)}`)
}