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
        if ([
            UserIdentityType.admin,
            UserIdentityType.manager, 
            UserIdentityType.member
        ].includes(user.identity_type))
            await Promise.all([
                dispatch(fetTasks()),
                dispatch(fetchWorkReports()),
                dispatch(fetchProjects())
            ])
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardMain)