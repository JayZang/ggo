import axios from 'axios'

const URL = '/api/members/:id/emergency-contacts'

export function getEmergencyContacts(id: number | string) {
    return axios.get<[{
        id: number
        member_id: number
        name: string
        relationship: string
        phone: string
    }]>(URL.replace(':id', id.toString()))
}