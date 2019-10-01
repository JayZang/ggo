import { Dispatch } from 'redux'

import { GET_ALL_MEMBERS, MemberActionTypes } from './types'
import * as memberAPI from 'api/member'

export const getAllMembers = () => async (dispatch: Dispatch) => {
  const res = await memberAPI.all()

  const action: MemberActionTypes = {
    type: GET_ALL_MEMBERS,
    payload: {
      members: res.data
    }
  }
  
  dispatch(action)
} 