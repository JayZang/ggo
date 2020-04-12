import React, { Component } from 'react'
import { Paper, Box, Divider, Typography, Grid, Button, Tabs, Tab, LinearProgress } from '@material-ui/core'
import {
    Add as AddIcon,
    Assignment as TaskIcon,
} from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'

import ProjectTaskItem from './TaskItem'
import TaskEditDrawer from 'components/Task/EditPanel/EditDrawer'
import { ITask, TaskStatus } from 'contracts/task'
import { IProject } from 'contracts/project'
import { WithStyles, withStyles } from '@material-ui/styles'
import styles from './styles'
import moment from 'moment'

type IProps = WithStyles<typeof styles> & {
    project: IProject | null
    tasks: ITask[] | null
}

type IState = {
    openCreateDrawer: boolean
    tabIndex: number
}

class ProjectTaskList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state= {
            openCreateDrawer: false,
            tabIndex: 0
        }
    }

    render() {
        const {
            project,
            tasks,
            classes
        } = this.props
        const {
            tabIndex
        } = this.state

        return (
            <Paper>
                <Box className="py-3 px-4">
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <Grid container alignItems="center">
                                <Typography variant="h5" component="div">
                                    <TaskIcon className="mr-1" />
                                    <Box component="span">
                                        工作任務 {tasks && tasks.length ? `(${tasks.length})` : null}
                                    </Box>
                                </Typography>
                                <Box
                                    border="1px solid rgba(0, 0, 0, .1)"
                                    borderRadius={5}
                                    marginLeft={3}
                                >
                                    <Tabs 
                                        classes={{
                                            root: classes.tabsWrapper
                                        }}
                                        width="200px"
                                        value={tabIndex} 
                                        indicatorColor="primary"
                                        textColor="primary"
                                        onChange={(event, val) => this.setState({ tabIndex: val })}
                                    >
                                        <Tab label="列表" className={classes.tabItem}/>
                                        <Tab label="統計" className={classes.tabItem}/>
                                    </Tabs>
                                </Box>
                            </Grid>
                        </Grid>
                        {project && !project.finish_datetime ? (
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
                        ) : null}
                        
                    </Grid>
                </Box>

                <Divider />

                {(() => {
                    if (tabIndex === 0) return (
                        <Box maxHeight={390} style={{ overflowY: 'auto' }}>
                            {(() => {
                                if (tasks) {
                                    return tasks.length ? tasks.map(task => (
                                        <Box key={task.id}>
                                            <ProjectTaskItem task={task} isEditable={!!project && !project.finish_datetime}/>
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
                    ) 
                    else if (tabIndex === 1) {
                        const totalCount = tasks ? tasks.length : 0
                        let progressingCount = 0
                        let pauseCount = 0
                        let completedCount = 0
                        let terminatedCount = 0
                        let expiredCount = 0

                        tasks && tasks.forEach(task => {
                            if (task.status !== TaskStatus.Completed && 
                                task.status !== TaskStatus.Terminated &&
                                moment().isAfter(task.deadline_datetime))
                                expiredCount++
                                
                            switch (task.status) {
                                case TaskStatus.Normal:
                                    progressingCount++
                                    break
                                    
                                case TaskStatus.Pause:
                                    pauseCount++
                                    break

                                case TaskStatus.Completed:
                                    completedCount++
                                    break

                                case TaskStatus.Terminated:
                                    terminatedCount++
                                    break

                            }
                        })

                        let progressingRate = parseInt((progressingCount / totalCount * 100).toString()) || 0
                        let pauseRate = parseInt((pauseCount / totalCount * 100).toString()) || 0
                        let completedRate = parseInt((completedCount / totalCount * 100).toString()) || 0
                        let terminatedRate = parseInt((terminatedCount / totalCount * 100).toString()) || 0
                        let expiredRate = parseInt((expiredCount / totalCount * 100).toString()) || 0

                        return ( 
                            <Box className="p-4">
                                <Grid container spacing={5}>
                                    <Grid item xs={4}>
                                        <Box display="flex" justifyContent="space-between" alignItems="baseline" marginBottom={1}>
                                            <Typography variant="h6">工作任務總數</Typography>
                                            <Typography variant="body2">{totalCount} 筆</Typography>
                                        </Box>
                                        <LinearProgress variant="determinate" value={100} color="primary" />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box display="flex" justifyContent="space-between" alignItems="baseline" marginBottom={1}>
                                            <Typography variant="h6">執行中</Typography>
                                            <Typography variant="body2">{progressingCount} 筆 ({progressingRate}％)</Typography>
                                        </Box>
                                        <LinearProgress variant="determinate" value={progressingRate} classes={{
                                            root: classes.progressingBarContainer,
                                            bar: classes.progressingBarIndicator
                                        }} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box display="flex" justifyContent="space-between" alignItems="baseline" marginBottom={1}>
                                            <Typography variant="h6">暫停中</Typography>
                                            <Typography variant="body2">{pauseCount} 筆 ({pauseRate}％)</Typography>
                                        </Box>
                                        <LinearProgress variant="determinate" value={pauseRate} classes={{
                                            root: classes.pauseBarContainer,
                                            bar: classes.pauseBarIndicator
                                        }} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box display="flex" justifyContent="space-between" alignItems="baseline" marginBottom={1}>
                                            <Typography variant="h6">已終止</Typography>
                                            <Typography variant="body2">{terminatedCount} 筆 ({terminatedRate}％)</Typography>
                                        </Box>
                                        <LinearProgress variant="determinate" value={terminatedRate} classes={{
                                            root: classes.terminatedBarContainer,
                                            bar: classes.terminatedBarIndicator
                                        }} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box display="flex" justifyContent="space-between" alignItems="baseline" marginBottom={1}>
                                            <Typography variant="h6">已完成</Typography>
                                            <Typography variant="body2">{completedCount} 筆 ({completedRate}％)</Typography>
                                        </Box>
                                        <LinearProgress variant="determinate" value={completedRate} classes={{
                                            root: classes.successBarContainer,
                                            bar: classes.successBarIndicator
                                        }} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box display="flex" justifyContent="space-between" alignItems="baseline" marginBottom={1}>
                                            <Typography variant="h6">逾期未完成</Typography>
                                            <Typography variant="body2">{expiredCount} 筆 ({expiredRate}％)</Typography>
                                        </Box>
                                        <LinearProgress variant="determinate" value={expiredRate} classes={{
                                            root: classes.expiredBarContainer,
                                            bar: classes.expiredBarIndicator
                                        }} />
                                    </Grid>
                                </Grid>
                            </Box>
                        )
                    }
                })()}

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

export default withStyles(styles)(ProjectTaskList)