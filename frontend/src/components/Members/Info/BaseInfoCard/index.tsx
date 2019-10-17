import { connect } from 'react-redux'

import MemberBaseInfoCard from './BaseInfoCard'
import { RootState  } from 'stores'

const mapStateToProps = (state: RootState) => ({
    member: state.member.memberInfo.baseInfo
})

export default connect(mapStateToProps)(MemberBaseInfoCard)