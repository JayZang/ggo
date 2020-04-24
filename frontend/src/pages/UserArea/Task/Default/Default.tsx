import React, { Component } from 'react'
import { Typography, Box, Divider, Paper, Grid } from '@material-ui/core'

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import TaskItem from 'components/Task/List/TaskMenu/TaskItem'
import { green, blue, lime, amber } from '@material-ui/core/colors'
import { ITask } from 'contracts/task'
import { withRouter, RouteComponentProps } from 'react-router'

const PageSymbol = Symbol('User.Task.List')

class TaskCountCard extends Component<{
    title: string
    count: number
    color?: string
    bgcolor?: string
}> {
    render() {
        const {
            title,
            count,
            color,
            bgcolor
        } = this.props

        return (
            <Paper
                elevation={2}
                className="p-3 d-flex align-items-center"
                style={{ background: bgcolor, color }}
            >
                <Typography component="div">
                    <Box fontWeight="bold" fontSize={18}>
                        {title}
                    </Box>
                </Typography>
                <Typography component="div" className="ml-auto">
                    <Box fontWeight="bold" fontSize={32}>
                        {count}
                    </Box>
                </Typography>
            </Paper>
        )
    }
}

type IProps = RouteComponentProps & {
    countOfTotal: number
    countOfCompleted: number
    countOfProcessing: number
    countOfWorkReport: number
    tasks: ITask[] | null
    init: () => Promise<void>
    fetchTasks: () => Promise<void>
}

type IState = {
    isFetching: boolean
}

class TaskDefault extends Component<IProps, IState> {
    state = {
        isFetching: false
    }

    componentDidMount() {
        if (!this.props.tasks) {
            this.setState({ isFetching: true }, () => {
                this.props.init().finally(() => {
                    this.setState({ isFetching: false })
                })
            })
        }
    }

    handleScrollBottom() {
        if (this.state.isFetching)
            return

        this.setState({ isFetching: true }, () => {
            this.props.fetchTasks().finally(() => {
                this.setState({ isFetching: false })
            })
        })
    }

    render() {
        const {
            countOfTotal,
            countOfCompleted,
            countOfProcessing,
            countOfWorkReport,
            tasks
        } = this.props

        return (
            <AppContent
                mobileHeader={(
                    <MobileHeader
                        title="我的任務"
                        defaultHidden={false}
                    />
                )}
                onScrollBottom={this.handleScrollBottom.bind(this)}
                pageSymbol={PageSymbol}
            >
                <Typography variant="h5" component="div">
                    <Box fontWeight={500}>我的任務</Box>
                </Typography>
                <Typography variant="subtitle2" component="div">
                    <Box color="text.hint">查看我的任務，追縱、設置任務進度並提交工作報告吧！</Box>
                </Typography>
                <Divider className="mt-2 mb-3" />
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <TaskCountCard
                            title="我的任務"
                            count={countOfTotal}
                            color="white"
                            bgcolor={`linear-gradient(10deg, ${lime[600]} 30%, ${lime[300]} 100%)`}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TaskCountCard
                            title="完成的任務"
                            count={countOfCompleted}
                            color="white"
                            bgcolor={`linear-gradient(10deg, ${green[500]} 30%, ${green[200]} 100%)`}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TaskCountCard
                            title="任務進行中"
                            count={countOfProcessing}
                            color="white"
                            bgcolor={`linear-gradient(10deg, ${blue[500]} 30%, ${blue[200]} 100%)`}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TaskCountCard
                            title="我的工作報告"
                            count={countOfWorkReport}
                            color="white"
                            bgcolor={`linear-gradient(10deg, ${amber[500]} 30%, ${amber[200]} 100%)`}
                        />
                    </Grid>
                </Grid>
                <Box className="mt-4">
                    {(tasks || []).map(task => (
                        <TaskItem 
                            task={task} 
                            key={task.id} 
                            className="mb-3" 
                            disableProjectLink={true}
                            disableAssignmentLink={true}
                            onViewBtnClick={() => {
                                this.props.history.push(`${this.props.match.path}/${task.id}`)
                            }}
                        />
                    ))}
                </Box>
            </AppContent>
        )
    }
}

export default withRouter(TaskDefault)