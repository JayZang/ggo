import React, { Component } from 'react'
import { Box, Grid, Avatar, Typography, Tooltip } from '@material-ui/core'
import { Link } from 'react-router-dom'
import {
    Group as GroupIcon
} from '@material-ui/icons'

import { ITask, TaskAssignType } from 'contracts/task'
import { IMember } from 'contracts/member'
import { ITeam } from 'contracts/team'

class LinkWrapper extends Component<{
    link: string
    title: string
}> {
    render() {
        return (
            <Link to={this.props.link}>
                <Tooltip title={this.props.title} placement="bottom-start">
                    <Box>{this.props.children}</Box>
                </Tooltip>
            </Link>
        )
    }
}

type IProps = {
    task: ITask
    disableLink?: boolean
}

export default class AssignmentLabel extends Component<IProps> {
    render() {
        const {
            task,
            disableLink
        } = this.props

        return (
            <Box>
                {(() => {
                    let content: JSX.Element = <Box />
                    let link: string = ''
                    let hintTitle: string = ''

                    switch (task.assignment.type) {
                        case TaskAssignType.Member:
                            const member = task.assignment.target as IMember
                            link = `/members/${member.id}`
                            hintTitle = '檢視成員'
                            content = (
                                <Grid container alignItems="center" spacing={2}>
                                    <Avatar src={member.avatar} />
                                    <Grid item>
                                        <Grid container direction="column">
                                            <Typography component="div">
                                                <Box fontWeight="bold">{member.name}</Box>
                                            </Typography>
                                            <Typography variant="body2" component="div">
                                                <Box color="text.hint">負責對象：成員</Box>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                            break

                        case TaskAssignType.Team:
                            const team = task.assignment.target as ITeam
                            link = `/members/${team.id}`
                            hintTitle = '檢視團隊'
                            content = (
                                <Grid container alignItems="center" spacing={2}>
                                    <Avatar><GroupIcon /></Avatar>
                                    <Grid item>
                                        <Grid container direction="column">
                                            <Typography component="div">
                                                <Box fontWeight="bold">{team.name}</Box>
                                            </Typography>
                                            <Typography variant="body2" component="div">
                                                <Box color="text.hint">負責對象：團隊</Box>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                            break
                    }

                    return disableLink ?
                        <Box>{content}</Box> :
                        <LinkWrapper link={link} title={hintTitle}>{content}</LinkWrapper>
                })()}
            </Box>
        )
    }
}