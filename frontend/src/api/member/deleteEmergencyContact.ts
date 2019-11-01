import axios from 'axios'

const URL = '/api/members/emergency-contacts/:id'

export function deleteEmergencyContact(id: number | string) {
    return axios.delete<{
        member_id: number
        name: string
        relationship: string
        phone: string
    }>(URL.replace(':id', id.toString()))
}