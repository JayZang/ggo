import IAMMain from './main'
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import { getPolicies, getGroups } from 'stores/iam/action'
import { RootState } from 'stores'

const mapStateToProps = (state: RootState) => ({
    allPolicies: state.iam.policies || [],
    allGroups: state.iam.groups || []
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async () => {
        await Promise.all([
            dispatch(getPolicies()),
            dispatch(getGroups())
        ])
    }
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(IAMMain)