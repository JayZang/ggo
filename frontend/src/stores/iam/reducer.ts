import { IAMState, IAMActionTypes, GET_POLICIES, GET_GROUPS, ADD_GROUP, DELETE_GROUP, UPDATE_GROUP } from "./types";

const initState: IAMState = {
    policies: null,
    groups: null
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

        default:
            return state
    }
}