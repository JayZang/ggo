import { Dispatch } from "redux";
import axios from "axios";

import * as authApi from 'api/auth'
import * as profileApi from 'api/profile'
import { regularizeUserData } from "stores/iam/utils"
import { authTokenName } from 'config/httpHeader'
import { authTokenKeyName } from 'config/localStorage'
import { AuthActionTypes, LOGIN, LOGOUT, UPDATE_USER_MEMBER_AVATAR, REFRESH_AUTH_TOKEN } from "./types"
import { regularizeMemberData } from "stores/utils/regularizeMemberData";

// axios request interceptor
let requestInterceptor:number | null = null
// axios response interceptor
let responseInterceptor:number | null = null

export const login = (account_id: string, password: string) => async (dispatch: Dispatch) => {
    const res = await authApi.login(account_id, password)

    const token = res.headers[authTokenName]
    const action: AuthActionTypes = {
        type: LOGIN,
        payload: {
            token: res.headers[authTokenName],
            user: regularizeUserData(res.data)
        }
    }

    localStorage.setItem(authTokenKeyName, token)
    registerRequestInterceptor()
    registerResponseInterceptor(dispatch)
    dispatch(action)
}

export const logout = () => async (dispatch: Dispatch) => {
    const token = localStorage.getItem(authTokenKeyName)

    if (!token) return

    await authApi.logout(token)
    
    localStorage.removeItem(authTokenKeyName)
    requestInterceptor !== null && axios.interceptors.request.eject(requestInterceptor)
    responseInterceptor !== null && axios.interceptors.response.eject(responseInterceptor)
    const action: AuthActionTypes = {
        type: LOGOUT,
    }

    dispatch(action)
}

export const checkAuthToken = () => async (dispatch: Dispatch) => {
    const token = localStorage.getItem(authTokenKeyName)

    if (!token) return

    await authApi.check(token).then(res => {
        const action: AuthActionTypes = {
            type: LOGIN,
            payload: {
                token:  res.headers[authTokenName],
                user: regularizeUserData(res.data)
            }
        }
    
        registerRequestInterceptor()
        registerResponseInterceptor(dispatch)
        dispatch(action)
    }).catch(() => {
        localStorage.removeItem(authTokenKeyName)
    })
}

export const updateAvatar = (file: File) => async (dispatch: Dispatch) => {
    const res = await profileApi.updateAvatar(file)
    
    const action: AuthActionTypes = {
        type: UPDATE_USER_MEMBER_AVATAR,
        payload: {
            member: regularizeMemberData(res.data)
        }
    }

    dispatch(action)
}

function registerRequestInterceptor() {
    requestInterceptor = axios.interceptors.request.use(config => {
        /**  insert token to http header **/
        config.headers[authTokenName] = localStorage.getItem(authTokenKeyName)

        return config
    })
}

function registerResponseInterceptor(dispatch: Dispatch) {
    responseInterceptor = axios.interceptors.response.use(res => {
        /** if response header has new token, refresh local token state  **/
        const newToken = res.headers[authTokenName]
        if (res.headers[authTokenName]) {
            localStorage.setItem(authTokenKeyName, newToken)

            const action: AuthActionTypes = {
                type: REFRESH_AUTH_TOKEN,
                payload: {
                    token: newToken
                }
            }

            dispatch(action)
        }

        return res
    }, error => {
        if (error.response.status === 401) {
            localStorage.removeItem(authTokenKeyName)
            requestInterceptor !== null && axios.interceptors.request.eject(requestInterceptor)
            responseInterceptor !== null && axios.interceptors.response.eject(responseInterceptor)

            const action: AuthActionTypes = {
                type: LOGOUT,
            }
        
            dispatch(action)
        }
        return Promise.reject(error)
    })
}