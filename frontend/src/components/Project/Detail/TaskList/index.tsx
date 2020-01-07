import { connect } from "react-redux";

import ProjectTaskList from './TaskList'
import { RootState } from "stores";

const mapStateToProps = (state: RootState) => ({
    project: state.project.projectDetail.baseInfo,
    tasks: state.task.tasksOfProject
})

export default connect(mapStateToProps)(ProjectTaskList)