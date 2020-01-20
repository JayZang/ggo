import { connect } from 'react-redux'

import MemberList from './MemberList'
import { fetchMembers } from 'stores/member/action'

export default connect(null, { 
    fetchMembers
})(MemberList)