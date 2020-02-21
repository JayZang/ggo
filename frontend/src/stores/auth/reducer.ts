import { AuthState, AuthActionTypes, LOGIN, LOGOUT } from './types'

const initState: AuthState = {
    token: null
}

export default function authReducer(state: AuthState = initState, action: AuthActionTypes): AuthState {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: action.payload.token
            }

        case LOGOUT:
            return {
                ...state,
                token: null
            }

        default:
            return state
    }
}