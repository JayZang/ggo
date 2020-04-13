import React, { Component } from 'react'
import { Paper, Typography, Divider, Box, ListItem, List, ListItemText, ListItemAvatar, Avatar, IconButton, ListItemSecondaryAction, Checkbox } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ProjectIcon from '@material-ui/icons/BusinessCenter';
import SearchIcon from '@material-ui/icons/Search'

import ProjectDetailDialog from 'components/Dashboard/ProjectDetailDialog'
import { IProject } from 'contracts/project';
import { Link } from 'react-router-dom';
import { blue } from '@material-ui/core/colors';

type IProps = {
    projects: IProject[]
    onCheckBoxChange?: (checked: boolean) => void
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
                <Box className="p-3 d-flex align-items-center" borderLeft={`4px solid ${blue[400]}`}>
                    <Checkbox
                        className="p-0 mr-3"
                        defaultChecked
                        color="primary"
                        onChange={(event, checked) => {
                            this.props.onCheckBoxChange && this.props.onCheckBoxChange(checked)
                        }}
                    />
                    <Typography variant="h6">
                        進行中專案
                    </Typography>
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
                <Divider />
                <Box paddingY={1} paddingX={2} color="primary.main" textAlign="right">
                    <Link to="/projects">
                        <Typography component="span" variant="subtitle2">
                            <ArrowRightAltIcon /> 查看更多
                        </Typography>
                    </Link>
                </Box>

                <ProjectDetailDialog
                    project={projectToDisplayDetail}
                    onClose={() => this.setState({
                        projectToDisplayDetail: null
                    })}
                />
            </Paper>
        )
    }
}