import React, { Component } from 'react'
import { Paper, Box, Typography } from '@material-ui/core'
import {
    Equalizer as EqualizerIcon
} from '@material-ui/icons'

import TasksGanttChart from './index'
import { ITask } from 'contracts/task'

type IProps = {
    tasks: ITask[]
}

class TasksGanttChartPanel extends Component<IProps> {
    render() {
        const { tasks } = this.props

        return (
            <Paper>
                <Box className="px-4 py-3">
                    <Typography variant="h6" className="d-flex align-items-center">
                        <Box className="mr-1" style={{ transform: 'rotate(90deg)' }}>
                            <EqualizerIcon />
                        </Box>
                        任務甘特圖
                    </Typography>
                </Box>
                <TasksGanttChart
                    tasks={tasks}
                />
            </Paper>
        )
    }
}

export default TasksGanttChartPanel