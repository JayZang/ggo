import React, { Component } from 'react'
import { Box } from '@material-ui/core'

import { TaskStatus } from 'contracts/task'

type IProps = {
    status: TaskStatus
}

class TaskStatusLabel extends Component<IProps> {
    render() {
        const status = this.props.status

        if (status === TaskStatus.Normal) {
            return (
                <Box className="badge badge-primary">
                    執行中
                </Box>
            )
        }  else if (status === TaskStatus.Pause) { 
            return (
                <Box className="badge badge-warning">
                    暫停中
                </Box>
            )
        } else if (status === TaskStatus.Terminated) {
            return (
                <Box className="badge badge-danger">
                    已終止
                </Box>
            )
        } else if (status === TaskStatus.Completed) {
            return (
                <Box className="badge badge-success">
                    已完成
                </Box>
            )
        } else {
            return 'Something Wrong'
        }
    }
}

export default TaskStatusLabel