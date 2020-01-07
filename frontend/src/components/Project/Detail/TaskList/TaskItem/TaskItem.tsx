import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    Group as GroupIcon
} from '@material-ui/icons'
import { Box, 
    Typography, 
    Grid, 
    WithStyles, 
    Button, 
    Avatar, 
    Menu, 
    MenuItem, 
    withStyles
} from '@material-ui/core'

import styles from './styles'
import { ITask, TaskAssignType, TaskStatus } from 'contracts/task'
import { IMember } from 'contracts/member'
import { ITeam } from 'contracts/team'
import TaskStatusLabel from 'components/Task/StatusLabel'

type IProps = WithStyles<typeof styles> & {
    task: ITask,
    updateStatus: (id: string | number, status: TaskStatus) => Promise<void>
}

type IState = {
    statusBtnAnchorEl: HTMLElement | null
}

class ProjectTaskItem  extends Component<IProps, IState> {
    constructor(props: any) {
        super(props)

        this.state = {
            statusBtnAnchorEl: null
        }
    }

    handleUpdateStatusClick(status: TaskStatus) {
        this.setState({ statusBtnAnchorEl: null })

        if (this.props.task.status === status)
            return

        this.props.updateStatus(
            this.props.task.id,
            status
        )
    }

    render() {
        const {
            task,
            classes
        } = this.props
        const {
            statusBtnAnchorEl
        } = this.state

        return (
            <Box className="p-3 pr-4">
                <Grid container justify="space-between" alignItems="center">
                    <Grid item className={classes.fieldTaskName}>
                        {/* <Checkbox 
                            color="primary"
                        /> */}
                        <Box marginLeft={1}>
                            <Typography>
                                {task.name}
                            </Typography>
                            <Typography className={classes.fieldHint}>
                                任務名稱
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Typography>
                            {task.start_datetime.format('YYYY-MM-DD')}
                        </Typography>
                        <Typography className={classes.fieldHint}>
                            起始日期
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography>
                            {task.deadline_datetime.format('YYYY-MM-DD')}
                        </Typography>
                        <Typography className={classes.fieldHint}>
                            最後期限日期
                        </Typography>
                    </Grid>
                    <Grid item>
                        {(() => {
                            switch (task.assignment.type) {
                                case TaskAssignType.Member:
                                    const member = task.assignment.target as IMember
                                    return (
                                        <Link to={`/members/${member.id}`}>
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
                                        </Link>
                                    )

                                case TaskAssignType.Team:
                                    const team = task.assignment.target as ITeam
                                    return (
                                        <Link to={`/teams/${team.id}`}>
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
                                        </Link>
                                    )
                            }
                        })()}
                    </Grid>
                    <Grid item>
                        <Button disableRipple disableFocusRipple onClick={event => this.setState({
                            statusBtnAnchorEl: event.currentTarget
                        })}>
                            <TaskStatusLabel status={task.status} />
                        </Button>
                        <Menu
                            anchorEl={statusBtnAnchorEl}
                            keepMounted
                            open={Boolean(statusBtnAnchorEl)}
                            onClose={() => this.setState({ statusBtnAnchorEl: null })}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                        >
                            <MenuItem disableRipple
                                onClick={this.handleUpdateStatusClick.bind(this, TaskStatus.Normal)}
                            >
                                執行
                            </MenuItem>
                            <MenuItem disableRipple
                                onClick={this.handleUpdateStatusClick.bind(this, TaskStatus.Pause)}
                            >
                                暫停
                            </MenuItem>
                            <MenuItem disableRipple
                                onClick={this.handleUpdateStatusClick.bind(this, TaskStatus.Terminated)}
                            >
                                終止
                            </MenuItem>
                            <MenuItem disableRipple
                                onClick={this.handleUpdateStatusClick.bind(this, TaskStatus.Completed)}
                            >
                                完成
                            </MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default withStyles(styles)(ProjectTaskItem)