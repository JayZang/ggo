import IAMMain from './main'
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import { getPolicies, getGroups, getUsers } from 'stores/iam/action'
import { RootState } from 'stores'

const mapStateToProps = (state: RootState) => ({
    systemUser: state.auth.user,
    allPolicies: state.iam.policies || [],
    allGroups: state.iam.groups || [],
    users: state.iam.users || []
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async () => {
        await Promise.all([
            dispatch(getPolicies()),
            dispatch(getGroups()),
            dispatch(getUsers()),
        ])
    }
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(IAMMain)