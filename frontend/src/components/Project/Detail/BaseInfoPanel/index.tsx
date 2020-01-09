import { connect } from "react-redux";

import ProjectBaseInfoPanel from './BaseInfoPanel'
import { RootState } from "stores";
import { finishProject } from "stores/project/action";
import { TaskStatus } from "contracts/task";

const mapStateToProps = (state: RootState) => ({
    project: state.project.projectDetail.baseInfo,
    isCanBeFinished: !!state.task.tasksOfProject && !!state.task.tasksOfProject.length && (() => {
        return state.task.tasksOfProject.reduce((preStatus, task) => {
            return preStatus && (task.status === TaskStatus.Completed || task.status === TaskStatus.Terminated)
        }, true)
    })()
})

export default connect(mapStateToProps, {
    finishProject
})(ProjectBaseInfoPanel)