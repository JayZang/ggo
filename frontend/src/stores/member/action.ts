import { Dispatch } from 'redux'
import moment from 'moment'

import * as memberAPI from 'api/member'
import { 
  GET_ALL_MEMBERS, 
  CLEAR_MEMBERS,
  MemberActionTypes 
} from './types'

export const fetchMembers = () => async (dispatch: Dispatch) => {
  const res = await memberAPI.all()

  const action: MemberActionTypes = {
    type: GET_ALL_MEMBERS,
    payload: {
      members: res.data.map(member => {
        return {
          ...member,
          birthday:  moment(member.birthday),
          createdAt: moment(member.createdAt),
          updateAt:  moment(member.updateAt)
        }
      })
    }
  }
  
  dispatch(action)
} 

export function clearMembers(): MemberActionTypes {
  return {
    type: CLEAR_MEMBERS
  }
}