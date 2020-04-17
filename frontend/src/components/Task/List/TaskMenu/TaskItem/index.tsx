import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { WithStyles, withStyles } from '@material-ui/styles'
import { Paper, Grid, Typography, Box, Tooltip, Button } from '@material-ui/core'
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import ArrowRightOutlinedIcon from '@material-ui/icons/ArrowRightOutlined';
import clsx from 'clsx'

import { ITask } from 'contracts/task'
import AssignmentLabel from 'components/Task/AssignmentLabel'
import StatusLabel from 'components/Task/StatusLabel'
import styles from './style'

type IProps = WithStyles<typeof styles> & {
    task: ITask,
    className?: string
    disableProjectLink?: boolean
    disableAssignmentLink?: boolean
    onViewBtnClick?: () => void
}

class TaskItem extends Component<IProps> {
    handleViewBtnClick() {
        this.props.onViewBtnClick && this.props.onViewBtnClick()
    }

    render() {
        const {
            task,
            classes,
            className,
            disableProjectLink,
            disableAssignmentLink
        } = this.props

        return (
            <Paper className={`p-3 ${className}`}>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item className={clsx(classes.field, 'taskName')}>
                        <Typography>{task.name}</Typography>
                        <Box color="text.hint" fontSize={14}>任務名稱</Box>
                    </Grid>
                    <Grid item className={clsx(classes.field, 'projectName')}>
                        {(() => {
                            const content = (
                                <Box>
                                    <Typography>
                                        <Box component="span">{task.project && task.project.name}</Box>
                                        {
                                            task.project && task.project.finish_datetime ?
                                                <Box component="span" className="badge badge-success ml-1">已結案</Box> :
                                                null
                                        }
                                    </Typography>
                                    <Box color="text.hint" fontSize={14}>所屬專案</Box>
                                </Box>
                            )
                            return disableProjectLink ?
                                content :
                                <Link to={`/projects/${task.project_id}`} >
                                    <Tooltip title="檢視專案" placement="bottom-start">
                                        {content}
                                    </Tooltip>
                                </Link>
                        })()}
                    </Grid>
                    <Tooltip title="工作任務期限" placement="bottom-start">
                        <Box className="d-flex align-items-center h-100">
                            <Typography>
                                <TodayOutlinedIcon />
                                {task.start_datetime.format('YYYY-MM-DD')}
                            </Typography>
                            <ArrowRightOutlinedIcon />
                            <Typography>
                                <TodayOutlinedIcon />
                                {task.deadline_datetime.format('YYYY-MM-DD')}
                            </Typography>
                        </Box>
                    </Tooltip>
                    <Grid item className={clsx(classes.field, 'assignment')}>
                        <AssignmentLabel task={task} disableLink={disableAssignmentLink} />
                    </Grid>
                    <Grid item className={clsx(classes.field, 'status')}>
                        <StatusLabel  task={task} editable={false} />
                    </Grid>
                    <Grid item className={clsx(classes.field, 'action')}>
                        <Button color="primary" onClick={this.handleViewBtnClick.bind(this)}>查看</Button>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(styles)(TaskItem)