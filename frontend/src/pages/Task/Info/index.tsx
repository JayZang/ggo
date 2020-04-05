import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import TaskInfo from './Info'
import { RootState } from 'stores';
import { fetchTaskDetailInfo } from 'stores/task/action';

const mapStateToProps = (state: RootState) => ({
    task: state.task.detailPage.task
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async (id: number | string) => {
        await dispatch(fetchTaskDetailInfo(id))
    }
}) 

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskInfo)