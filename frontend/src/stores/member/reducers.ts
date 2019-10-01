import { 
  MemberState, 
  MemberActionTypes,
  GET_ALL_MEMBERS,
  CLEAR_MEMBERS
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

    default:
      return state
  }
}