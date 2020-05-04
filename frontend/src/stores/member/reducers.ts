import {
    MemberState,
    MemberActionTypes,
    CLEAR_MEMBERS,
    UPDATE_MEMBER,
    REMOVE_MEMBER,
    GET_MEMBER_DETAIL_INFO,
    ADD_EMERGENCY_CONTACT,
    REMOVE_EMERGENCY_CONTACT,
    GET_MEMBER_COUNT_STATISTIC,
    GET_MEMBER_LIST,
    ADD_MEMBER_TO_LIST,
    UPDATE_MEMBER_STATUS
} from './types'
import { REGISTER_MEMBER_USER, IAMActionTypes } from 'stores/iam/types'

const initState: MemberState = {
    listPage: {
        list: null,
        totalCount: 0,
        activeCount: 0,
        inactiveCount: 0
    },
    infoPage: {
        member: null,
        emergencyContacts: null,
        teams: null
    }
}

export default function memberReducer(state = initState, action: MemberActionTypes | IAMActionTypes): MemberState {
    switch (action.type) {
        case CLEAR_MEMBERS:
            return {
                ...state,
                listPage: {
                    ...initState.listPage
                }
            }

        case GET_MEMBER_COUNT_STATISTIC:
            return {
                ...state,
                listPage: {
                    ...state.listPage,
                    ...action.payload
                }
            }

        case GET_MEMBER_LIST:
            return {
                ...state,
                listPage: {
                    ...state.listPage,
                    list: [
                        ...(state.listPage.list || []),
                        ...action.payload.members
                    ]
                }
            }

        case ADD_MEMBER_TO_LIST:
            return {
                ...state,
                listPage: {
                    ...state.listPage,
                    list: [
                        ...(state.listPage.list || []),
                        action.payload.member
                    ],
                    totalCount: state.listPage.totalCount + 1
                }
            }

        case UPDATE_MEMBER:
            return {
                ...state,
                listPage: {
                    ...(state.listPage),
                    list: state.listPage.list && state.listPage.list.map(member => {
                        if (action.payload.member.id !== member.id)
                            return member
                        return action.payload.member
                    })
                },
                infoPage: {
                    ...(state.infoPage),
                    member: action.payload.member.id === (state.infoPage.member && state.infoPage.member.id) ? 
                        action.payload.member : null
                }
            }

        case UPDATE_MEMBER_STATUS:
            return {
                ...state,
                listPage: {
                    ...(state.listPage),
                    list: state.listPage.list && state.listPage.list.map(member => {
                        if (action.payload.id === member.id)
                            member.status = action.payload.status
                        return member
                    })
                },
                infoPage: {
                    ...(state.infoPage),
                    member: state.infoPage.member && state.infoPage.member.id === action.payload.id ? {
                        ...state.infoPage.member,
                        status: action.payload.status
                    } : state.infoPage.member
                }
            }

        case REMOVE_MEMBER:
            return {
                ...state,
                listPage: {
                    ...(state.listPage),
                    list: state.listPage.list && state.listPage.list.filter(member => {
                        return member.id !== action.payload.id
                    }),
                    totalCount: state.listPage.totalCount - 1
                }
            }

        case GET_MEMBER_DETAIL_INFO:
            return  {
                ...state,
                infoPage: {
                    ...(state.infoPage),
                    ...action.payload
                }
            }

        case ADD_EMERGENCY_CONTACT:
            return {
                ...state,
                infoPage: {
                    ...(state.infoPage),
                    emergencyContacts: [
                        ...(state.infoPage.emergencyContacts || []),
                        action.payload.emergencyContact
                    ]
                }
            }

        case REMOVE_EMERGENCY_CONTACT:
            return {
                ...state,
                infoPage: {
                    ...(state.infoPage),
                    emergencyContacts: state.infoPage.emergencyContacts && state.infoPage.emergencyContacts.filter(emergencyContact => {
                        return emergencyContact.id !== action.payload.id
                    })
                }
            }

        case REGISTER_MEMBER_USER:
            return {
                ...state,
                listPage: {
                    ...state.listPage,
                    list: state.listPage.list && state.listPage.list.map(member => {
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