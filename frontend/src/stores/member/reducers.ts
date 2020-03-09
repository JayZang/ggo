import {
    MemberState,
    MemberActionTypes,
    CLEAR_MEMBERS,
    ADD_MEMBER_LIST,
    UPDATE_MEMBER,
    REMOVE_MEMBER,
    GET_MEMBER_BASE_INFO,
    CLEAR_MEMBER_INFO,
    GET_MEMBER_EMERGENCY_CONTACT,
    ADD_EMERGENCY_CONTACT,
    REMOVE_EMERGENCY_CONTACT,
    GET_MEMBER_COUNT_STATISTIC,
    GET_TEAM_MEMBERS
} from './types'
import { REGISTER_MEMBER_USER, IAMActionTypes } from 'stores/iam/types'

const initState: MemberState = {
    members: {
        list: null,
        totalCount: 0,
        activeCount: 0,
        inactiveCount: 0
    },
    memberInfo: {
        baseInfo: null,
        emergenctContacts: null
    },
    teamMembers: null
}

export default function memberReducer(state = initState, action: MemberActionTypes | IAMActionTypes): MemberState {
    switch (action.type) {
        case CLEAR_MEMBERS:
            return {
                ...state,
                members: {
                    list: null,
                    totalCount: 0,
                    activeCount: 0,
                    inactiveCount: 0
                }
            }

        case GET_MEMBER_COUNT_STATISTIC:
            return {
                ...state,
                members: {
                    ...state.members,
                    ...action.payload
                }
            }

        case ADD_MEMBER_LIST:
            return {
                ...state,
                members: {
                    ...state.members,
                    list: [
                        ...(state.members.list || []),
                        ...action.payload.members
                    ],
                    totalCount: state.members.totalCount + action.payload.totalCountIncrement
                }
            }

        case UPDATE_MEMBER:
            return {
                ...state,
                members: {
                    ...(state.members),
                    list: state.members.list && state.members.list.map(member => {
                        if (action.payload.member.id !== member.id)
                            return member
    
                        return action.payload.member
                    })
                },
                memberInfo: {
                    ...(state.memberInfo),
                    baseInfo: action.payload.member.id === (state.memberInfo.baseInfo && state.memberInfo.baseInfo.id) ? 
                        action.payload.member : null
                }
            }

        case REMOVE_MEMBER:
            return {
                ...state,
                members: {
                    ...(state.members),
                    list: state.members.list && state.members.list.filter(member => {
                        return member.id !== action.payload.id
                    }),
                    totalCount: state.members.totalCount - 1
                }
            }

        case GET_MEMBER_BASE_INFO:
            return  {
                ...state,
                memberInfo: {
                    ...(state.memberInfo),
                    baseInfo: action.payload.member
                }
            }

        case GET_MEMBER_EMERGENCY_CONTACT:
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

        case GET_TEAM_MEMBERS:
            return {
                ...state,
                teamMembers: action.payload.members
            }

        case REGISTER_MEMBER_USER:
            return {
                ...state,
                members: {
                    ...state.members,
                    list: state.members.list && state.members.list.map(member => {
                        if (member.id === action.payload.memberId)
                            member.isUser = true
                        return member
                    })
                }
            }

        default:
            return state
    }
}