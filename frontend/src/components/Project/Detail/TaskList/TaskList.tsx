import React, { Component } from 'react'
import { Paper, Box, Divider, Typography, Grid, Button } from '@material-ui/core'
import {
    Add as AddIcon,
    Assignment as TaskIcon,
} from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'

import ProjectTaskItem from './TaskItem'
import TaskEditDrawer from 'components/Task/EditPanel/EditDrawer'
import { ITask } from 'contracts/task'
import { IProject } from 'contracts/project'

type IProps = {
    project: IProject | null
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
            project,
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
                                新增工作任務
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <Divider />
                <Divider />

                <Box maxHeight={390} style={{ overflowY: 'auto' }}>
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
                    project={project || undefined}
                    open={this.state.openCreateDrawer}
                    onOpen={() => this.setState({ openCreateDrawer: true })}
                    onClose={() => this.setState({ openCreateDrawer: false })}
                />
            </Paper>
        )
    }
}

export default ProjectTaskList