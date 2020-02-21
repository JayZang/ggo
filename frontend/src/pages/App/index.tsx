import App from './App'
import { connect } from 'react-redux';
import { RootState } from 'stores';
import { ThunkDispatch } from 'redux-thunk';
import { checkAuthToken } from 'stores/auth/action';

const mapStateToProps = (state: RootState) => ({
    isLogin: !!state.auth.token
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    init: async () => {
        await dispatch(checkAuthToken())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)