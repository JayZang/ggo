import { connect } from 'react-redux'

import MemberDataCards from './MemberDataCards'
import { MemberStatus } from 'contracts/member'
import { RootState } from 'stores'

const mapStateToProps = (state: RootState) => ({
  totalMembers:    state.member.members.length,
  activeMembers:   state.member.members.filter(m => m.status === MemberStatus.active).length,
  inactiveMembers: state.member.members.filter(m => m.status === MemberStatus.inactive).length
})

export default connect(mapStateToProps)(MemberDataCards)