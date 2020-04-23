import { AuthState, AuthActionTypes, LOGIN, LOGOUT, UPDATE_USER_MEMBER_AVATAR } from './types'

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

        case UPDATE_USER_MEMBER_AVATAR:
            return {
                ...state,
                user: state.user && {
                    ...state.user,
                    identity: state.user.identity && {
                        ...state.user.identity,
                        avatar: action.payload.member.avatar
                    }
                }
            }

        default:
            return state
    }
}