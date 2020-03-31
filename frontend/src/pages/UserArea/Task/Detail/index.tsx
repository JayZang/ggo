import { connect } from 'react-redux';

import TaskDetail from './Detail'
import { ThunkDispatch } from 'redux-thunk';
import { fetchTaskInfo } from 'stores/userArea/action';
import { RootState } from 'stores';

const mapStateToProps = (state: RootState) => ({
    task: state.userArea.taskPage.detail.task
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    init: async (id: number) => {
        await dispatch(fetchTaskInfo(id))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskDetail)