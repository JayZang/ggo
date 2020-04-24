import React, { Component } from 'react'
import { Paper, Box, Typography, Divider } from '@material-ui/core'
import TocIcon from '@material-ui/icons/Toc';

import TasksStastic from './index'
import { ITask } from 'contracts/task'

type IProps = {
    tasks: ITask[]
}

export default class TasksStatisticPanel extends Component<IProps> {
    render() {
        const {
            tasks
        } = this.props

        return (
            <Paper>
                <Box className="px-4 py-3">
                    <Typography variant="h6" className="d-flex align-items-center">
                        <TocIcon className="mr-1" />
                        任務統計
                    </Typography>
                </Box>
                <Divider />
                <TasksStastic tasks={tasks} />
            </Paper>
        )
    }
}