import axios from 'axios'

const URL = '/api/members/:id/teams'

export function getTeamsByMember(id: number | string) {
    return axios.get<[{
        id: number
        name: string,
        description: string,
        is_temporary: boolean,
        status: number,
        leader_id: number,
        create_at: string,
        members_count: number
    }]>(URL.replace(':id', id.toString()))
}