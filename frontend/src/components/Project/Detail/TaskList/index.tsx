import React, { Component } from 'react'
import { Paper, Box, Divider, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import {
    Add as AddIcon,
    Assignment as TaskIcon,
} from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'

import { ITask, TaskStatus } from 'contracts/task'
import { IProject } from 'contracts/project'
import ProjectTaskItem from './TaskItem'
import TaskEditDrawer from 'components/Task/EditPanel/EditDrawer'

type IProps = {
    project: IProject | null
    tasks: ITask[] | null
    editable: boolean
    listMaxHeight?: number
    onTaskViewBtnClick?: (task: ITask) => void
}

type IState = {
    openCreateDrawer: boolean
    statusFilter: TaskStatus | ''
}

class ProjectTaskList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state= {
            openCreateDrawer: false,
            statusFilter: ''
        }
    }

    render() {
        const {
            project,
            tasks,
            editable,
            listMaxHeight,
            onTaskViewBtnClick
        } = this.props
        const {
            statusFilter
        } = this.state

        return (
            <Paper>
                <Box className="py-3 px-4">
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <Typography variant="h6" component="div" className="d-flex align-items-center">
                                <TaskIcon className="mr-1" />
                                <Box component="span">
                                    工作任務 {tasks && tasks.length ? `(${tasks.length})` : null}
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item className="d-flex align-items-center">
                            <FormControl variant="outlined">
                                <Select
                                    displayEmpty
                                    value={statusFilter}
                                    onChange={event => this.setState({ statusFilter: event.target.value as any })}
                                    inputProps={{
                                        className: 'py-1'
                                    }}
                                >
                                    <MenuItem value="">全部</MenuItem>
                                    <MenuItem value={TaskStatus.Normal}>執行中</MenuItem>
                                    <MenuItem value={TaskStatus.Pause}>暫停中</MenuItem>
                                    <MenuItem value={TaskStatus.Completed}>已完成</MenuItem>
                                    <MenuItem value={TaskStatus.Terminated}>已終止</MenuItem>
                                </Select>
                            </FormControl>
                            {editable ? (
                                <Button 
                                    size="small"
                                    color="primary" 
                                    className="ml-3"
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={() => this.setState({ openCreateDrawer: true })}
                                >
                                    新增工作任務
                                </Button>
                            ) : null}
                        </Grid>
                    </Grid>
                </Box>

                <Divider />

                <Box maxHeight={listMaxHeight} overflow="auto">
                    {tasks ? tasks
                        .filter(task => statusFilter === '' ? true : statusFilter === task.status )
                        .map(task => (
                        <Box key={task.id}>
                            <ProjectTaskItem 
                                task={task} 
                                isEditable={editable}
                                onViewBtnClick={() => {
                                    onTaskViewBtnClick && onTaskViewBtnClick(task)
                                }}
                            />
                            <Divider />
                        </Box>
                    )) : (
                        <Box className="p-3 px-4">
                            <Skeleton width={300} />
                            <Skeleton width={130} />
                        </Box>
                    )}
                    {editable && tasks && tasks.length === 0 ? (
                        <Box className="p-4">
                            <Button 
                                variant="outlined" 
                                startIcon={<AddIcon />} 
                                onClick={() => this.setState({ openCreateDrawer: true })}
                                fullWidth
                            >
                                新增工作任務
                            </Button>
                        </Box>
                    ) : null}
                    {!editable && tasks && tasks.length === 0 ? (
                        <Box className="p-4 text-center">
                            <Typography>尚無工作任務</Typography>
                        </Box>
                    ) : null}
                </Box>

                {editable ? (
                    <TaskEditDrawer 
                        project={project}
                        open={this.state.openCreateDrawer}
                        onOpen={() => this.setState({ openCreateDrawer: true })}
                        onClose={() => this.setState({ openCreateDrawer: false })}
                    />
                ) : null}
            </Paper>
        )
    }
}

export default ProjectTaskList