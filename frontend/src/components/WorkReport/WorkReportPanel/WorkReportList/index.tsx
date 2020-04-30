import { connect } from 'react-redux';

import { RootState } from 'stores';
import WorkReportList from './WorkReportList'
import { UserIdentityType } from 'contracts/user';

const mapStateToProps = (state: RootState) => ({
    userMemberId: state.auth.user && [
        UserIdentityType.manager, 
        UserIdentityType.member
    ].includes(state.auth.user.identity_type) ?
        state.auth.user.identity_id :
        null
})

export default connect(mapStateToProps)(WorkReportList)