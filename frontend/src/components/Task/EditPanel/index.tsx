import { connect } from "react-redux";

import TaskEditPanel from './EditPanel'
import { ThunkDispatch } from "redux-thunk";
import { createTask } from "stores/userArea/action";

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    createTask: async (projectId: number | string, data: any) => {
        await dispatch(createTask(projectId, data))
    }
})

export default connect(null, mapDispatchToProps)(TaskEditPanel)