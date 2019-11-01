import {
    MemberState,
    MemberActionTypes,
    GET_ALL_MEMBERS,
    CLEAR_MEMBERS,
    ADD_MEMBER,
    UPDATE_MEMBER,
    REMOVE_MEMBER,
    GET_MEMBER_BASE_INFO,
    CLEAR_MEMBER_INFO,
    GET_MEMBER_EMERGENCT_CONTACT,
    ADD_EMERGENCY_CONTACT,
    REMOVE_EMERGENCY_CONTACT
} from './types'

const initState: MemberState = {
    members: [],
    memberInfo: {
        baseInfo: null,
        emergenctContacts: null
    }
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
                }),
                memberInfo: {
                    ...(state.memberInfo),
                    baseInfo: action.payload.member.id === (state.memberInfo.baseInfo && state.memberInfo.baseInfo.id) ? 
                        action.payload.member : null
                }
            }

        case REMOVE_MEMBER:
            return {
                ...state,
                members: state.members.filter(member => {
                    return member.id !== action.payload.id
                })
            }

        case GET_MEMBER_BASE_INFO:
            return  {
                ...state,
                memberInfo: {
                    ...(state.memberInfo),
                    baseInfo: action.payload.member
                }
            }

        case GET_MEMBER_EMERGENCT_CONTACT:
            return {
                ...state,
                memberInfo: {
                    ...(state.memberInfo),
                    emergenctContacts: action.payload.emergencyContacts
                }
            }

        case ADD_EMERGENCY_CONTACT:
            return {
                ...state,
                memberInfo: {
                    ...(state.memberInfo),
                    emergenctContacts: [
                        ...(state.memberInfo.emergenctContacts || []),
                        action.payload.emergencyContact
                    ]
                }
            }

        case REMOVE_EMERGENCY_CONTACT:
            return {
                ...state,
                memberInfo: {
                    ...(state.memberInfo),
                    emergenctContacts: 
                        state.memberInfo.emergenctContacts &&
                        state.memberInfo.emergenctContacts.filter(emergencyContact => {
                            return emergencyContact.id != action.payload.id
                        })
                }
            }

        case CLEAR_MEMBER_INFO:
            return {
                ...state,
                memberInfo: {
                    baseInfo: null,
                    emergenctContacts: null
                }
            }

        default:
            return state
    }
}