import { connect } from 'react-redux';

import DashboardMain from './Main'
import { RootState } from 'stores';
import { ThunkDispatch } from 'redux-thunk';
import { fetTasks, fetchProjects, fetchWorkReports } from 'stores/dashboard/action';
import { IUser, UserIdentityType } from 'contracts/user';

const mapStateToProps = (state: RootState) => ({
    user: state.auth.user,
    tasks: state.dashboard.tasks || [],
    projects: state.dashboard.projects || [],
    workReports: state.dashboard.workReports || []
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    init: async (user: IUser) => {
        await Promise.all([
            (user.permissions && user.permissions.project_management) || user.identity_type === UserIdentityType.member ? dispatch(fetTasks()) : null,
            (user.permissions && user.permissions.project_management) || user.identity_type === UserIdentityType.member ? dispatch(fetchWorkReports()) : null,
            user.permissions && user.permissions.project_management ? dispatch(fetchProjects()) : null,
        ])
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardMain)