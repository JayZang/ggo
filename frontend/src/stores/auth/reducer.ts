import { AuthState, AuthActionTypes, LOGIN, LOGOUT } from './types'

const initState: AuthState = {
    token: null,
    user: null
}

export default function authReducer(state: AuthState = initState, action: AuthActionTypes): AuthState {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user
            }

        case LOGOUT:
            return {
                ...state,
                token: null,
                user: null
            }

        default:
            return state
    }
}