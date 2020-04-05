import React, { Component } from 'react'
import { Box } from '@material-ui/core'

import { ITask } from 'contracts/task'
import TaskItem from './TaskItem'
import { withRouter, RouteComponentProps } from 'react-router'

type IProps = RouteComponentProps & {
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
                    <TaskItem 
                        className="mb-3" 
                        key={task.id} 
                        task={task}
                        onViewBtnClick={() => this.props.history.push(`/tasks/${task.id}`)}
                    />
                )))()}
            </Box>
        )
    }
}

export default withRouter(TaskMenu)