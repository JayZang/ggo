import { connect } from 'react-redux';

import DashboardMain from './Main'
import { RootState } from 'stores';
import { ThunkDispatch } from 'redux-thunk';
import { fetchUserTasks } from 'stores/dashboard/action';

const mapStateToProps = (state: RootState) => ({
    tasks: state.dashboard.taskList.list || []
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    init: async () => {
        await dispatch(fetchUserTasks())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardMain)