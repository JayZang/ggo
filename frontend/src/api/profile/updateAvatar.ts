import axios from 'axios'

const URL = '/api/m/profile/avatar'

export function updateAvatar(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    return axios.post<{
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
    }>(URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}