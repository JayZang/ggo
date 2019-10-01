import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import MemberList from './MemberList'
import { fetchMembers, clearMembers } from 'stores/member/action'
import { RootState } from 'stores'

const mapStateToProps = (state: RootState) => ({
  members: state.member.members
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => (
  bindActionCreators({ fetchMembers, clearMembers }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(MemberList)