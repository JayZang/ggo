import { connect } from 'react-redux';

import UserEditPanel from './EditPanel'
import { RootState } from 'stores';

const mapStateToProps = (state: RootState) => ({
    totalGroups: state.iam.groups || [],
    totalPolicies: state.iam.policies || []
})

export default connect(mapStateToProps, {
    update: async (is: string| number, data: any) => {}
})(UserEditPanel)