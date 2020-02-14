import axios from 'axios'

const URL = '/api/teams/:id/members'

export function getMembersByTeam(id: string | number) {
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
    }[]>(URL.replace(':id', id.toString()))
}