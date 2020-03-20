import { IUser } from "contracts/user"

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SET_TOKEN = 'SET_TOKEN'

export type AuthState = {
    token: string | null
    user: IUser | null
}

type Login = {
    type: typeof LOGIN,
    payload: {
        token: string,
        user: IUser
    }
}

type Logout = {
    type: typeof LOGOUT,
}

export type AuthActionTypes = 
    Login |
    Logout
