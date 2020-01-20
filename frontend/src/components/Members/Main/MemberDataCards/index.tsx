import { connect } from 'react-redux'

import MemberDataCards from './MemberDataCards'
import { RootState } from 'stores'

const mapStateToProps = (state: RootState) => ({
    totalMembers: state.member.members.list ? state.member.members.totalCount : 0,
    activeMembers: state.member.members.list ? state.member.members.activeCount : 0,
    inactiveMembers: state.member.members.list ? state.member.members.inactiveCount : 0,
    loadedMembers: state.member.members.list ? state.member.members.list.length : 0,
})

export default connect(mapStateToProps)(MemberDataCards)