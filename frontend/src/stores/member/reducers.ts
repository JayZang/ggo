import { 
  MemberState, 
  MemberActionTypes,
  GET_ALL_MEMBERS
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

    default:
      return state
  }
}