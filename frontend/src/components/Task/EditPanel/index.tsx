import { connect } from "react-redux";

import TaskEditPanel from './EditPanel'
import { createProjectTask } from "stores/project/action";
import { clearMemberSelection, clearTeamSelection } from "stores/task/action";
import { ThunkDispatch } from "redux-thunk";

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    createTask: async (id: number | string, data: any) => {
        await dispatch(createProjectTask(id, data))
    },
    onComponentUnMount: () => {
        dispatch(clearMemberSelection())
        dispatch(clearTeamSelection())
    }
})

export default connect(null, mapDispatchToProps)(TaskEditPanel)