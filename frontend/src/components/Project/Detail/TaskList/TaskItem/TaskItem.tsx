import React, { Component } from 'react'
import { Box, 
    Typography, 
    Grid, 
    WithStyles,
    withStyles,
    Button
} from '@material-ui/core'

import styles from './styles'
import { ITask, TaskStatus } from 'contracts/task'
import TaskStatusLabel from 'components/Task/StatusLabel'
import AssignmentLabel from 'components/Task/AssignmentLabel'
import { Link } from 'react-router-dom'

type IProps = WithStyles<typeof styles> & {
    task: ITask,
    isEditable: boolean
    updateStatus: (id: string | number, status: TaskStatus) => Promise<void>
}

class ProjectTaskItem  extends Component<IProps> {
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
            isEditable,
            classes
        } = this.props

        return (
            <Box className="p-3 pr-4">
                <Grid container justify="space-between" alignItems="center">
                    <Grid item className={classes.fieldTaskName}>
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
                        <AssignmentLabel task={task} />
                    </Grid>
                    <Grid item>
                        <TaskStatusLabel task={task} editable={isEditable} />
                    </Grid>
                    <Grid item>
                        <Link to={`/tasks/${task.id}`}>
                            <Button color="primary">查看</Button>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default withStyles(styles)(ProjectTaskItem)