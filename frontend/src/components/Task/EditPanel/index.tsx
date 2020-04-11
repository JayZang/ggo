import { connect } from "react-redux";

import TaskEditPanel from './EditPanel'
import { ThunkDispatch } from "redux-thunk";
import { fetchMemberSelection, fetchTeamSelection, createTask } from "stores/task/action";

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    onDidMount: async () => {
        await Promise.all([
            dispatch(fetchMemberSelection()),
            dispatch(fetchTeamSelection()),
        ])
    },
    createTask: async (projectId: number | string, data: any) => {
        await dispatch(createTask(projectId, data))
    }
})

export default connect(null, mapDispatchToProps)(TaskEditPanel)