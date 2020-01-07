import { connect } from 'react-redux';

import ProjectTaskItem from './TaskItem'
import { updateTaskStatus } from 'stores/task/action';

export default connect(null, {
    updateStatus: updateTaskStatus
})(ProjectTaskItem)