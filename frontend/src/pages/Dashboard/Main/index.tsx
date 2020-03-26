import { connect } from 'react-redux';

import DashboardMain from './Main'
import { RootState } from 'stores';
import { ThunkDispatch } from 'redux-thunk';
import { fetTasks, fetchProjects } from 'stores/dashboard/action';
import { IUser } from 'contracts/user';

const mapStateToProps = (state: RootState) => ({
    user: state.auth.user,
    tasks: state.dashboard.tasks || [],
    projects: state.dashboard.projects || []
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    init: async (user: IUser) => {
        await Promise.all([
            dispatch(fetTasks()),
            user.permissions && user.permissions.project_management ? dispatch(fetchProjects()) : null
        ])
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardMain)