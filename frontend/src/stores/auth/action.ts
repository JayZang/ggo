import { Dispatch } from "redux";
import axios from "axios";

import * as authApi from 'api/auth'
import * as profileApi from 'api/profile'
import { regularizeUserData } from "stores/iam/utils"
import { authTokenName } from 'config/httpHeader'
import { authTokenKeyName } from 'config/localStorage'
import { AuthActionTypes, LOGIN, LOGOUT, UPDATE_USER_MEMBER_AVATAR } from "./types"
import { regularizeMemberData } from "stores/utils/regularizeMemberData";

// axios request interceptor
let interceptorOfInsertTokenToHeader:number | null = null
// axios response interceptor
let interceptorOfAuthExpired:number | null = null

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
    insertTokenToRequestHeader(token)
    handleAuthExpired(dispatch)
    dispatch(action)
}

export const logout = () => async (dispatch: Dispatch) => {
    const token = localStorage.getItem(authTokenKeyName)

    if (!token) return

    await authApi.logout(token)
    
    localStorage.removeItem(authTokenKeyName)
    interceptorOfInsertTokenToHeader !== null && axios.interceptors.request.eject(interceptorOfInsertTokenToHeader)
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
    
        insertTokenToRequestHeader(token)
        handleAuthExpired(dispatch)
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

function insertTokenToRequestHeader(token: string) {
    interceptorOfInsertTokenToHeader = axios.interceptors.request.use(config => {
        config.headers[authTokenName] = token
        return config
    })
}

function handleAuthExpired(dispatch: Dispatch) {
    interceptorOfAuthExpired = axios.interceptors.response.use(undefined, error => {
        if (error.response.status === 401) {
            localStorage.removeItem(authTokenKeyName)
            interceptorOfInsertTokenToHeader !== null && axios.interceptors.request.eject(interceptorOfInsertTokenToHeader)
            interceptorOfAuthExpired !== null && axios.interceptors.response.eject(interceptorOfAuthExpired)

            const action: AuthActionTypes = {
                type: LOGOUT,
            }
        
            dispatch(action)
        }
        return Promise.reject(error)
    })
}