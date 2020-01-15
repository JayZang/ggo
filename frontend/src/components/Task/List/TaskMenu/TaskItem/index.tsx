import React, { Component } from 'react'
import { Paper, Grid, Typography, Box, Tooltip } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { WithStyles, withStyles } from '@material-ui/styles'
import clsx from 'clsx'

import { ITask } from 'contracts/task'
import AssignmentLabel from 'components/Task/AssignmentLabel'
import StatusLabel from 'components/Task/StatusLabel'
import styles from './style'

type IProps = WithStyles<typeof styles> & {
    task: ITask,
    className?: string
}

class TaskItem extends Component<IProps> {
    render() {
        const {
            task,
            className,
            classes
        } = this.props

        return (
            <Paper className={`p-3 ${className}`}>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item className={clsx(classes.field, 'taskName')}>
                        <Typography>{task.name}</Typography>
                        <Box color="text.hint" fontSize={14}>任務名稱</Box>
                    </Grid>
                    <Grid item className={clsx(classes.field, 'projectName')}>
                        <Link to={`/projects/${task.project_id}`} >
                            <Tooltip title="檢視專案" placement="bottom-start">
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
                            </Tooltip>
                        </Link>
                    </Grid>
                    <Grid item className={clsx(classes.field, 'date')}>
                        <Typography>{task.start_datetime.format('YYYY-MM-DD')}</Typography>
                        <Box color="text.hint" fontSize={14}>起始日期</Box>
                    </Grid>
                    <Grid item className={clsx(classes.field, 'date')}>
                        <Typography>{task.deadline_datetime.format('YYYY-MM-DD')}</Typography>
                        <Box color="text.hint" fontSize={14}>最後期限日期</Box>
                    </Grid>
                    <Grid item className={clsx(classes.field, 'assignment')}>
                        <AssignmentLabel  task={task} />
                    </Grid>
                    <Grid item className={clsx(classes.field, 'status')}>
                        <StatusLabel  task={task} editable={!!task.project && !task.project.finish_datetime} />
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(styles)(TaskItem)