import { Dispatch } from "redux";

import * as authApi from 'api/auth'
import { AuthActionTypes, LOGIN, LOGOUT } from "./types";
import { authTokenName } from 'config/httpHeader'
import { authTokenKeyName } from 'config/localStorage'
import axios from "axios";
import { regularizeUserData } from "stores/iam/utils";

// axios request interceptor
let interceptorOfInsertTokenToHeader:number | null = null

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
        dispatch(action)
    }).catch(() => {
        localStorage.removeItem(authTokenKeyName)
    })
}

function insertTokenToRequestHeader(token: string) {
    interceptorOfInsertTokenToHeader = axios.interceptors.request.use(config => {
        config.headers[authTokenName] = token
        return config
    })
}