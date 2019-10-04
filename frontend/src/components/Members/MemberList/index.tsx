import { connect } from 'react-redux'

import MemberList from './MemberList'
import { fetchMembers, clearMembers } from 'stores/member/action'
import { RootState } from 'stores'

const mapStateToProps = (state: RootState) => ({
  members: state.member.members
})

export default connect(mapStateToProps, { 
  fetchMembers, 
  clearMembers 
})(MemberList)