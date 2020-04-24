import React, { Component } from 'react'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'

import DownToUpSlideTransition from 'components/Transition/DownToUpSlideTransition'
import TasksGanttChart from './index'
import { ITask } from 'contracts/task'

type IProps = {
    tasks: ITask[]
    open: boolean
    onClose: () => void
}

class TasksGanttChartDialog extends Component<IProps> {
    render() {
        const { tasks } = this.props

        return (
            <Dialog
                fullWidth
                maxWidth="lg"
                open={this.props.open}
                onClose={this.props.onClose}
                TransitionComponent={DownToUpSlideTransition}
            >
                <DialogTitle>
                    工作任務甘特圖
                    </DialogTitle>
                <DialogContent>
                    <TasksGanttChart tasks={tasks || []} />
                </DialogContent>
            </Dialog>
        )
    }
}

export default TasksGanttChartDialog