import React, { Component } from 'react'
import { Box, Grid, Avatar, Typography, Tooltip } from '@material-ui/core'
import { Link } from 'react-router-dom'
import {
    Group as GroupIcon
} from '@material-ui/icons'

import { ITask, TaskAssignType } from 'contracts/task'
import { IMember } from 'contracts/member'
import { ITeam } from 'contracts/team'

type IProps = {
    task: ITask
}

export default class AssignmentLabel extends Component<IProps> {
    render() {
        const {
            task
        } = this.props

        return (
            <Box>
                {(() => {
                    switch (task.assignment.type) {
                        case TaskAssignType.Member:
                            const member = task.assignment.target as IMember
                            return (
                                <Link to={`/members/${member.id}`}>
                                    <Tooltip title="檢視成員" placement="bottom-start">
                                        <Grid container alignItems="center" spacing={2}>
                                            <Avatar src={member.avatar} />
                                            <Grid item>
                                                <Grid container direction="column">
                                                    <Typography component="div">
                                                        <Box fontWeight="bold">{member.name}</Box>
                                                    </Typography>
                                                    <Typography  variant="body2" component="div">
                                                        <Box color="text.hint">負責對象：成員</Box>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Tooltip>
                                </Link>
                            )

                        case TaskAssignType.Team:
                            const team = task.assignment.target as ITeam
                            return (
                                <Link to={`/teams/${team.id}`}>
                                    <Tooltip title="檢視團隊" placement="bottom-start">
                                        <Grid container alignItems="center" spacing={2}>
                                            <Avatar><GroupIcon /></Avatar>
                                            <Grid item>
                                                <Grid container direction="column">
                                                    <Typography component="div">
                                                        <Box fontWeight="bold">{team.name}</Box>
                                                    </Typography>
                                                    <Typography  variant="body2" component="div">
                                                        <Box color="text.hint">負責對象：團隊</Box>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Tooltip>
                                </Link>
                            )
                    }
                })()}
            </Box>
        )
    }
}