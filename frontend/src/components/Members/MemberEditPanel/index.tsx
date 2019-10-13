import { connect } from 'react-redux'

import MemberEditPanel from './MemberEditPanel'
import { createMember, updateMember } from 'stores/member/action'

export default connect(null, {
    createMember,
    updateMember
})(MemberEditPanel)