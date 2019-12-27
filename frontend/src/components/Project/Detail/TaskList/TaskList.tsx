import React, { Component } from 'react'
import { Paper, Box, Divider, Typography, Grid, withStyles, WithStyles, Checkbox, Button } from '@material-ui/core'
import {
    Add as AddIcon,
    Assignment as TaskIcon
} from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'

import { projectItemStyle } from './style'
import TaskEditDrawer from 'components/Task/EditPanel/EditDrawer'
import { ITask } from 'contracts/task'

const ProjectTaskItem = withStyles(projectItemStyle)
    (class _ProjectTaskItem  extends Component<WithStyles<typeof projectItemStyle> & {
        task: ITask
    }> {
    render() {
        const {
            task,
            classes
        } = this.props

        return (
            <Box className="p-3 pr-4">
                <Grid container justify="space-between" alignItems="center">
                    <Grid item className="d-flex">
                        <Checkbox 
                            color="primary"
                        />
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
                        <Typography>
                            成員1號
                        </Typography>
                        <Typography className={classes.fieldHint}>
                            負責對象
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography>
                            {task.status}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        )
    }
})

type IProps = {
    tasks: ITask[] | null
}

type IState = {
    openCreateDrawer: boolean
}

class ProjectTaskList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state= {
            openCreateDrawer: false
        }
    }

    render() {
        const {
            tasks
        } = this.props

        return (
            <Paper>
                <Box className="py-3 px-4">
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <Typography variant="h5" component="div">
                                <TaskIcon className="mr-1" />
                                <Box component="span">工作任務</Box>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button 
                                color="primary" 
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => this.setState({ openCreateDrawer: true })}
                            >
                                新增
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <Divider />
                <Divider />

                <Box maxHeight={389} style={{ overflowY: 'auto' }}>
                    {(() => {
                        if (tasks) {
                            return tasks.length ? tasks.map(task => (
                                <Box key={task.id}>
                                    <ProjectTaskItem task={task} />
                                    <Divider />
                                </Box>
                            )) : (
                                <Box className="p-4">
                                    <Button 
                                        // color="primary" 
                                        variant="outlined" 
                                        startIcon={<AddIcon />} 
                                        onClick={() => this.setState({ openCreateDrawer: true })}
                                        fullWidth
                                    >
                                        新增工作任務
                                    </Button>
                                </Box>
                            )
                        } else return (
                            <Box className="p-3 px-4">
                                <Skeleton width={300} />
                                <Skeleton width={130} />
                            </Box>
                        )
                    })()}
                </Box>

                <TaskEditDrawer 
                    open={this.state.openCreateDrawer}
                    onOpen={() => this.setState({ openCreateDrawer: true })}
                    onClose={() => this.setState({ openCreateDrawer: false })}
                />
            </Paper>
        )
    }
}

export default ProjectTaskList