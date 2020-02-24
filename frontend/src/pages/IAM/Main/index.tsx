import IAMMain from './main'
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import { getPolicies } from 'stores/iam/action'
import { RootState } from 'stores'

const mapStateToProps = (state: RootState) => ({
    allPolicies: state.iam.policies || []
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async () => {
        await dispatch(getPolicies())
    }
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(IAMMain)