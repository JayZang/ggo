import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import TaskList from './List'
import { RootState } from 'stores';
import { fetchTasks, clearTaskList, getTaskCountStatistic } from 'stores/task/action';

const mapStateToProps = (state: RootState) => {
    const {
        taskList: tasks,
        statistic
    } = state.task

    return {
        tasks,
        isAllTasksLoaded: !!tasks && tasks.length >= statistic.totalCount
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async () => {
        await Promise.all([
            dispatch(getTaskCountStatistic()),
            dispatch(fetchTasks())
        ])
    },
    fetchTasks: async () => {
        await dispatch(fetchTasks())
    } ,
    reload: async () => {
        await Promise.all([
            dispatch(getTaskCountStatistic()),
            dispatch(clearTaskList()),
            dispatch(fetchTasks())
        ])
    },
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(TaskList)