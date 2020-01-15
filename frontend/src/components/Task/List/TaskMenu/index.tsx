import React, { Component } from 'react'
import { Box } from '@material-ui/core'

import { ITask } from 'contracts/task'
import TaskItem from './TaskItem'

type IProps = {
    tasks: ITask[]
}

class TaskMenu extends Component<IProps> {
    render() {
        const {
            tasks
        } = this.props

        return (
            <Box>
                {(() => tasks.map(task => (
                    <TaskItem className="mb-3" key={task.id} task={task} />
                )))()}
            </Box>
        )
    }
}

export default TaskMenu