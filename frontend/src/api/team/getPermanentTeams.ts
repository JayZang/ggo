import axios from 'axios'

const URL = '/api/teams/temporary'

export function getTemporaryTeams() {
    return axios.get<[{
        id: number
        name: string,
        description: string,
        is_temporary: boolean,
        status: number,
        leader_id: number,
        create_at: string,
        members_count: number,
        leader: {
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
        }
    }]>(URL)
}