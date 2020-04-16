import { connect } from 'react-redux'

import MemberList from './MemberList'
import { fetchMembers } from 'stores/member/action'
import { RootState } from 'stores'
import { UserIdentityType } from 'contracts/user'

const mapStateToProps = (state: RootState) => ({
    hasPermissionToRegisterUser: 
        !!state.auth.user && 
        [UserIdentityType.admin, UserIdentityType.manager].includes(state.auth.user.identity_type)
})

export default connect(
    mapStateToProps, 
    { fetchMembers }
)(MemberList)