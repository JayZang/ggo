import { connect } from 'react-redux'
import  MemberItem from './MemberItem'

import { removeMember } from 'stores/member/action'

export default connect(null, {
    handleDeleteMember: removeMember
})(MemberItem)