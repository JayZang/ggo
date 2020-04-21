import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import ProjectTask from './Task'
import { RootState } from 'stores'
import { fetchProjectTaskInfo } from 'stores/userArea/action'

const mapStateToProps = (state: RootState) => ({
    task: state.userArea.projectPage.taskInfo
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async (projectId: number | string, taskId: number | string) => {
        await dispatch(fetchProjectTaskInfo(projectId, taskId))
    }
}) 

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectTask)