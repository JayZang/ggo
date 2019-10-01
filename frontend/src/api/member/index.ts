import axios from 'axios'

import { GET_ALL_MEMBERS, GetAllMembersResData } from './types'

export async function all() {
  return axios.get<GetAllMembersResData>(GET_ALL_MEMBERS)
}