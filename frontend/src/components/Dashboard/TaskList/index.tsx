import React, { Component } from 'react'
import { Paper, Typography, Divider, Box, ListItem, List, ListItemText, ListItemIcon, ListItemAvatar, Avatar, IconButton, ListItemSecondaryAction, Menu, MenuItem, Select } from '@material-ui/core';
import TaskIcon from '@material-ui/icons/Assignment';
import SearchIcon from '@material-ui/icons/Search'

import { ITask, TaskStatus } from 'contracts/task';
import TaskDetailDialog from 'components/Dashboard/TaskDetailDialog'

type IProps = {
    tasks: ITask[],
    onListTasksChange?: (tasks: ITask[]) => void
}

type IState = {
    taskToDisplayDetail: ITask | null
    taskStatusCondition: TaskStatus
    listedTasks: ITask[]
}

export default class TaskList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            taskToDisplayDetail: null,
            taskStatusCondition: TaskStatus.Normal,
            listedTasks: this.filterTasks(TaskStatus.Normal)
        }
    }

    componentDidUpdate(prevProps: IProps) {
        if (prevProps.tasks !== this.props.tasks)
            this.setState({
                listedTasks: this.filterTasks(this.state.taskStatusCondition)
            }, () => {
                this.props.onListTasksChange && this.props.onListTasksChange(
                    this.state.listedTasks
                )
            })
    }

    filterTasks(status: TaskStatus) {
        return this.props.tasks.filter(task => task.status === status)
    }

    handleFilterTypeChange(event: React.ChangeEvent<{ name?: string; value: unknown }>) {
        this.setState({
            listedTasks: this.filterTasks(event.target.value as any),
            taskStatusCondition: event.target.value as any
        }, () => {
            this.props.onListTasksChange && this.props.onListTasksChange(
                this.state.listedTasks
            )
        })
    }

    render() {
        const {
            listedTasks,
            taskToDisplayDetail
        } = this.state

        return (
            <Paper>
                <Box className="p-3 d-flex align-items-center">
                    <Typography variant="h6">
                        任務列表
                    </Typography>
                    <Box marginLeft="auto">
                        <Select
                            inputProps={{
                                className: "py-2"
                            }}
                            value={this.state.taskStatusCondition}
                            variant="outlined"
                            onChange={this.handleFilterTypeChange.bind(this)}
                        >
                            <MenuItem value={TaskStatus.Normal}>執行中</MenuItem>
                            <MenuItem value={TaskStatus.Pause}>暫停中</MenuItem>
                        </Select>
                    </Box>
                </Box>
                <Divider />
                <Box maxHeight={370} overflow="auto">
                    <List>
                        {listedTasks.map(task => (
                            <ListItem key={task.id}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <TaskIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={task.name}
                                    secondary={`${task.start_datetime.format('YYYY-MM-DD')} ~ ${task.deadline_datetime.format('YYYY-MM-DD')}`}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" onClick={() => this.setState({
                                        taskToDisplayDetail: task
                                    })}>
                                        <SearchIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <TaskDetailDialog 
                    task={taskToDisplayDetail} 
                    onClose={() => this.setState({ 
                        taskToDisplayDetail: null
                    })}
                />
            </Paper>
        )
    }
}