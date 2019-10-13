import {
    MemberState,
    MemberActionTypes,
    GET_ALL_MEMBERS,
    CLEAR_MEMBERS,
    ADD_MEMBER,
    UPDATE_MEMBER,
    REMOVE_MEMBER
} from './types'

const initState: MemberState = {
    members: []
}

export default function memberReducer(state = initState, action: MemberActionTypes): MemberState {
    switch (action.type) {
        case GET_ALL_MEMBERS:
            return {
                ...state,
                members: action.payload.members
            }

        case CLEAR_MEMBERS:
            return {
                ...state,
                members: []
            }

        case ADD_MEMBER:
            return {
                ...state,
                members: [
                    ...state.members,
                    action.payload.member
                ]
            }

        case UPDATE_MEMBER:
            return {
                ...state,
                members: state.members.map(member => {
                    if (action.payload.member.id !== member.id)
                        return member

                    return action.payload.member
                })
            }

        case REMOVE_MEMBER:
            return {
                ...state,
                members: state.members.filter(member => {
                    return member.id != action.payload.id
                })
            }

        default:
            return state
    }
}