import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import ProjectInfo from './Info'
import { RootState } from "stores";
import { TaskStatus } from "contracts/task";
import { fetchProjectDetailInfo } from "stores/userArea/action";

const mapStateToProps = (state: RootState) => {
    const user = state.auth.user
    const {project, tasks} = state.userArea.projectPage.info

    return {
        tasks,
        project,
        taskEditable:
            !!project && 
            !project.finish_datetime,
        projectEditable:
            !!user &&
            !!user.permissions &&
            !!user.permissions.project_management,
        projectFinishable:
            !!tasks &&
            !!project && 
            !project.finish_datetime &&
            !!tasks.length && 
            tasks.reduce<boolean>((preStatus, task) => {
                return preStatus && [
                    TaskStatus.Completed, 
                    TaskStatus.Terminated
                ].includes(task.status)
            }, true)
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async (id: string) => {
        await Promise.all([
            dispatch(fetchProjectDetailInfo(id))
        ])
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectInfo)