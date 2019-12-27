import { connect } from "react-redux";

import ProjectTaskList from './TaskList'
import { RootState } from "stores";

const mapStateToProps = (state: RootState) => ({
    tasks: state.project.projectDetail.tasks
})

export default connect(mapStateToProps)(ProjectTaskList)