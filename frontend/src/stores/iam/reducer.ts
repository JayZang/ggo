import { IAMState, IAMActionTypes, GET_POLICIES } from "./types";

const initState: IAMState = {
    policies: null
}

export default function iamReducer(state: IAMState = initState, action: IAMActionTypes): IAMState {
    switch (action.type) {
        case GET_POLICIES:
            return {
                ...state,
                policies: action.payload.policies
            }

        default:
            return state
    }
}