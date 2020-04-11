import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import TaskList from './List'
import { RootState } from 'stores';
import { fetchTasks, fetchTaskCountStatistic, clearTaskListState } from 'stores/task/action';

const mapStateToProps = (state: RootState) => {
    const { tasks, totalCount } = state.task.listPage

    return {
        tasks,
        isAllTasksLoaded: !!tasks && tasks.length >= totalCount
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async () => {
        await Promise.all([
            dispatch(fetchTaskCountStatistic()),
            dispatch(fetchTasks())
        ])
    },
    fetchTasks: async () => {
        await dispatch(fetchTasks())
    } ,
    reload: async () => {
        await Promise.all([
            dispatch(clearTaskListState()),
            dispatch(fetchTaskCountStatistic()),
            dispatch(fetchTasks())
        ])
    },
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(TaskList)