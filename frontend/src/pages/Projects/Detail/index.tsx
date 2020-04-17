import { connect } from "react-redux";

import ProjectDetail from './Detail'
import { RootState } from "stores";
import { ThunkDispatch } from "redux-thunk";
import { fetchProjectDetailInfo } from "stores/project/action";
import { UserIdentityType } from "contracts/user";
import { TaskStatus } from "contracts/task";

const mapStateToProps = (state: RootState) => {
    const user = state.auth.user
    const {project, tasks} = state.project.infoPage

    return {
        tasks,
        project,
        taskEditable:
            !!project && 
            !!user && 
            [UserIdentityType.manager, UserIdentityType.member].includes(user.identity_type) &&
            !project.finish_datetime &&
            !! project.managers &&
            project.managers.findIndex(manager => manager.id === user.identity_id) !== -1,
        projectFinishable:
            !!user && 
            !!tasks &&
            !!project && 
            [UserIdentityType.manager, UserIdentityType.member].includes(user.identity_type) &&
            !project.finish_datetime &&
            !! project.managers &&
            project.managers.findIndex(manager => manager.id === user.identity_id) !== -1 &&
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
)(ProjectDetail)