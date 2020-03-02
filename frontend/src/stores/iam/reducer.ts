import { IAMState, IAMActionTypes, GET_POLICIES, GET_GROUPS, ADD_GROUP, DELETE_GROUP, UPDATE_GROUP, GET_USERS, CONFIG_USER_LOGINABLE } from "./types";

const initState: IAMState = {
    policies: null,
    groups: null,
    users: null
}

export default function iamReducer(state: IAMState = initState, action: IAMActionTypes): IAMState {
    switch (action.type) {
        case GET_POLICIES:
            return {
                ...state,
                policies: action.payload.policies
            }

        case GET_GROUPS:
            return {
                ...state,
                groups: action.payload.groups
            }

        case ADD_GROUP:
            return {
                ...state,
                groups: [
                    ...(state.groups || []),
                    action.payload.group
                ]
            }

        case UPDATE_GROUP:
            return {
                ...state,
                groups: state.groups && state.groups.map(group => {
                    return group.id === action.payload.group.id ? action.payload.group : group
                })
            }

        case DELETE_GROUP:
            return {
                ...state,
                groups: state.groups && state.groups.filter(group => {
                    return action.payload.ids.findIndex((value: any) => group.id == value) === -1
                })
            }

        case GET_USERS:
            return {
                ...state,
                users: action.payload.users
            }

        case CONFIG_USER_LOGINABLE:
            return {
                ...state,
                users: state.users && state.users.map(user => {
                    if (user.id == action.payload.id)
                        user.loginable = action.payload.loginable
                    return user
                })
            }

        default:
            return state
    }
}