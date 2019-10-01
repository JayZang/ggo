import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import MemberList from './MemberList'
import { getAllMembers } from 'stores/member/action'
import { RootState } from 'stores'

const mapStateToProps = (state: RootState) => ({
  members: state.member.members
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchMembers: () => {
    dispatch(getAllMembers())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MemberList)