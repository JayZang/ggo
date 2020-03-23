import React, { Component } from 'react'
import { Paper, Typography, Divider, Box, ListItem, List, ListItemText, ListItemIcon, ListItemAvatar, Avatar, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import TaskIcon from '@material-ui/icons/Assignment';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { ITask } from 'contracts/task';

type IProps = {
    tasks: ITask[]
}

export default class TaskList extends Component<IProps> {
    render() {
        const {
            tasks
        } = this.props

        return (
            <Paper>
                <Typography className="p-3" variant="h6">
                    任務列表
                </Typography>
                <Divider />
                <Box >
                    <List>
                        {tasks.map(task => (
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
                                    <IconButton edge="end" aria-label="delete">
                                        <MoreVertIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Paper>
        )
    }
}