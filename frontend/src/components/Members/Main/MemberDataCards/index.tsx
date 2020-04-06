import { connect } from 'react-redux'

import MemberDataCards from './MemberDataCards'
import { RootState } from 'stores'

const mapStateToProps = (state: RootState) => ({
    totalMembers: state.member.listPage.list ? state.member.listPage.totalCount : 0,
    activeMembers: state.member.listPage.list ? state.member.listPage.activeCount : 0,
    inactiveMembers: state.member.listPage.list ? state.member.listPage.inactiveCount : 0,
    loadedMembers: state.member.listPage.list ? state.member.listPage.list.length : 0,
})

export default connect(mapStateToProps)(MemberDataCards)