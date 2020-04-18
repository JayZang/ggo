import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { RootState } from 'stores';
import TaskDefault from './Default'
import { fetchTasks, fetchTaskSimpleStatistic } from 'stores/userArea/action';

const mapStateToProps = (state: RootState) => ({
    tasks: state.userArea.taskPage.default.listData.data,
    ...state.userArea.taskPage.default.simpleStatistic
})

const mapDispatchToProps = (disaptch: ThunkDispatch<any, any, any>) => ({
    init: async () => {
        await Promise.all([
            disaptch(fetchTaskSimpleStatistic()),
            disaptch(fetchTasks())
        ])
    },
    fetchTasks: async () => {
        await disaptch(fetchTasks())
    }
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(TaskDefault)