import { connect } from 'react-redux';

import { RootState } from 'stores';
import WorkReportList from './WorkReportList'
import { UserIdentityType } from 'contracts/user';

const mapStateToProps = (state: RootState) => ({
    userMemberId: state.auth.user && state.auth.user.identity_type === UserIdentityType.member ?
        state.auth.user.identity_id :
        null
})

export default connect(mapStateToProps)(WorkReportList)