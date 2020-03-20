import axios from 'axios'
import { authTokenName } from 'config/httpHeader'

const URL = '/api/auth/logout'

export function logout(token: string) {
    return axios.post(URL, null,  {
        headers: {
            [authTokenName]: token
        }
    })
}