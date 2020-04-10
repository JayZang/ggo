import { connect } from 'react-redux'
import  MemberItem from './MemberItem'

import { removeMember, updateMemberStatus } from 'stores/member/action'

export default connect(null, {
    handleDeleteMember: removeMember,
    onStatusChangeBtnClick: updateMemberStatus
})(MemberItem)