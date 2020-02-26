import GroupEditPanel from './EditPanel'
import { RootState } from 'stores'
import { connect } from 'react-redux'
import { createGroup } from 'stores/iam/action'

const mapStateToProps = (state: RootState) => ({
    totalPolicies: state.iam.policies || []
})

export default connect(mapStateToProps, {
    create: createGroup
})(GroupEditPanel)