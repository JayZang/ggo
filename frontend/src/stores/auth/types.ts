import { IUser } from "contracts/user"
import { IMember } from "contracts/member"

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const REFRESH_AUTH_TOKEN = 'REFRESH_AUTH_TOKEN'
export const UPDATE_USER_MEMBER_AVATAR = 'UPDATE_USER_MEMBER_AVATAR'

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

type RefreshAuthToken = {
    type: typeof REFRESH_AUTH_TOKEN,
    payload: {
        token: string
    }
}

type UpdateUserMemberAvatar = {
    type: typeof UPDATE_USER_MEMBER_AVATAR,
    payload: {
        member: IMember
    }
}

export type AuthActionTypes = 
    Login |
    Logout |
    RefreshAuthToken |
    UpdateUserMemberAvatar
