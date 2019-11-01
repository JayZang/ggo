import axios from 'axios'

const URL = '/api/members/:id/emergency-contacts'

export function createEmergencyContact(id: number | string, data: {
    name: string
    relationship: string
    phone: string
}) {
    return axios.post<{
        id: number
        member_id: number
        name: string
        relationship: string
        phone: string
    }>(URL.replace(':id', id.toString()), data)
}