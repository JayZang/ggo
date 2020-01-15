import { connect } from 'react-redux';

import TaskStatusLabel from './StatusLabel'
import { updateTaskStatus } from 'stores/task/action';

export default connect(null, {
    updateStatus: updateTaskStatus
})(TaskStatusLabel)