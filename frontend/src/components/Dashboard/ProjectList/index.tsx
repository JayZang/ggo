import React, { Component } from 'react'
import { Paper, Typography, Divider, Box, ListItem, List, ListItemText, ListItemAvatar, Avatar, IconButton, ListItemSecondaryAction, Menu, MenuItem, Select } from '@material-ui/core';
import ProjectIcon from '@material-ui/icons/BusinessCenter';
import SearchIcon from '@material-ui/icons/Search'

import { IProject } from 'contracts/project';

type IProps = {
    projects: IProject[]
}

type IState = {
    projectToDisplayDetail: IProject | null
}

export default class ProjectList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            projectToDisplayDetail: null
        }
    }

    render() {
        const {
            projects
        } = this.props
        const {
            projectToDisplayDetail
        } = this.state

        return (
            <Paper>
                <Box className="p-3 d-flex align-items-center">
                    <Typography variant="h6">
                        進行中專案
                    </Typography>
                    <Box marginLeft="auto">
                        {/* <Select
                            inputProps={{
                                className: "py-2"
                            }}
                            value={this.state.taskStatusCondition}
                            variant="outlined"
                            onChange={this.handleFilterTypeChange.bind(this)}
                        >
                            <MenuItem value={TaskStatus.Normal}>執行中</MenuItem>
                            <MenuItem value={TaskStatus.Pause}>暫停中</MenuItem>
                        </Select> */}
                    </Box>
                </Box>
                <Divider />
                <Box maxHeight={300} overflow="auto">
                    <List>
                        {projects.map(project => (
                            <ListItem key={project.id}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ProjectIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={project.name}
                                    secondary={`${project.start_datetime.format('YYYY-MM-DD')} ~ ${project.deadline_datetime.format('YYYY-MM-DD')}`}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" onClick={() => this.setState({
                                        projectToDisplayDetail: project
                                    })}>
                                        <SearchIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                        {projects.length === 0 ? (
                            <ListItem>無進行中專案</ListItem>
                        ) : null}
                    </List>
                </Box>
            </Paper>
        )
    }
}