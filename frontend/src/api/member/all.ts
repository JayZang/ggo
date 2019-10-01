import axios from 'axios'

const URL = '/api/members'

export function all() {
  return axios.get<[{
    _id: string
    name: string
    gender: Boolean
    phone: string
    email: string
    birthday: string
    avatar?: string
    status: number
    createdAt: string
    updateAt: string
  }]>(URL)
}