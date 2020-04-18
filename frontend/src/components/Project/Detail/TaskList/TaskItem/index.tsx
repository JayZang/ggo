import React, { Component } from 'react'
import { Box, 
    Typography, 
    Grid, 
    WithStyles,
    withStyles,
    Button,
    Tooltip
} from '@material-ui/core'
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import ArrowRightOutlinedIcon from '@material-ui/icons/ArrowRightOutlined';
import { Link } from 'react-router-dom'

import styles from './styles'
import { ITask } from 'contracts/task'
import TaskStatusLabel from 'components/Task/StatusLabel'
import AssignmentLabel from 'components/Task/AssignmentLabel'

type IProps = WithStyles<typeof styles> & {
    task: ITask,
    isEditable: boolean
    onViewBtnClick?: () => void
}

class ProjectTaskItem  extends Component<IProps> {
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
                    <Tooltip title="工作任務期限" placement="bottom-start">
                        <Box className="d-flex align-items-center h-100 mx-2">
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
                    <Grid item>
                        <AssignmentLabel task={task} />
                    </Grid>
                    <Grid item>
                        <TaskStatusLabel task={task} editable={isEditable} />
                    </Grid>
                    <Grid item>
                        <Button color="primary" onClick={this.props.onViewBtnClick}>
                            查看
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default withStyles(styles)(ProjectTaskItem)