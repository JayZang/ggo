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
    GET_TEAM_MEMBERS,
    GET_MEMBER_LIST,
    ADD_MEMBER_TO_LIST
} from './types'
import { REGISTER_MEMBER_USER, IAMActionTypes } from 'stores/iam/types'

const initState: MemberState = {
    listPage: {
        list: null,
        listCount: 0,
        totalCount: 0,
        activeCount: 0,
        inactiveCount: 0
    },
    infoPage: {
        member: null
    },
    teamMembers: null
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
                    ],
                    listCount: action.payload.listCount
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
                    listCount: state.listPage.listCount + 1,
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

        case REMOVE_MEMBER:
            return {
                ...state,
                listPage: {
                    ...(state.listPage),
                    list: state.listPage.list && state.listPage.list.filter(member => {
                        return member.id !== action.payload.id
                    }),
                    listCount: state.listPage.listCount - 1,
                    totalCount: state.listPage.totalCount - 1
                }
            }

        case GET_MEMBER_DETAIL_INFO:
            return  {
                ...state,
                infoPage: {
                    ...(state.infoPage),
                    member: action.payload.member
                }
            }

        case ADD_EMERGENCY_CONTACT:
            return {
                ...state,
                infoPage: {
                    ...(state.infoPage),
                    member: state.infoPage.member && {
                        ...state.infoPage.member,
                        emergencyContacts: [
                            ...(state.infoPage.member.emergencyContacts || []),
                            action.payload.emergencyContact
                        ]
                    }
                }
            }

        case REMOVE_EMERGENCY_CONTACT:
            return {
                ...state,
                infoPage: {
                    ...(state.infoPage),
                    member: state.infoPage.member && {
                        ...state.infoPage.member,
                        emergencyContacts: (state.infoPage.member.emergencyContacts || []).filter(emergencyContact => {
                            if (emergencyContact.id !== action.payload.id)
                                return emergencyContact
                        })
                    }
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