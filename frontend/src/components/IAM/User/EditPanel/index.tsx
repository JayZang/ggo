import { connect } from 'react-redux';

import UserEditPanel from './EditPanel'
import { RootState } from 'stores';
import { updateUserPolicies } from 'stores/iam/action';

const mapStateToProps = (state: RootState) => ({
    totalGroups: state.iam.groups || [],
    totalPolicies: state.iam.policies || []
})

export default connect(mapStateToProps, {
    update: updateUserPolicies
})(UserEditPanel)