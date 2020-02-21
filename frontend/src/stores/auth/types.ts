export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SET_TOKEN = 'SET_TOKEN'

export type AuthState = {
    token: string | null
}

type Login = {
    type: typeof LOGIN,
    payload: {
        token: string
    }
}

type Logout = {
    type: typeof LOGOUT,
}

export type AuthActionTypes = 
    Login |
    Logout
