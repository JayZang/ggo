import React, { Component } from 'react'
import { Route } from 'react-router'
import { Box, Grid } from '@material-ui/core'
import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'

import ProjectAndTaskScheduler from 'components/Scheduler/ProjectAndTaskScheduler'
import TaskList from 'components/Dashboard/TaskList'
import { ITask } from 'contracts/task'

type IProps = {
    init: () => Promise<void>
    tasks: ITask[]
}

type IState = {
    listedTasks: ITask[]
}

export default class DashboardMain extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            listedTasks: props.tasks
        }
    }

    componentDidMount() {
        this.props.init()
    }

    render() {
        const {
            tasks
        } = this.props
        const {
            listedTasks
        } = this.state

        return (
            <AppContent
                mobileHeader={(
                    <MobileHeader
                        title="資料面板"
                        defaultHidden={false}
                    />
                )}
            >
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <TaskList  
                            tasks={tasks}
                            onListTasksChange={tasks => this.setState({
                                listedTasks: tasks
                            })}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <ProjectAndTaskScheduler tasks={listedTasks} />
                    </Grid>
                </Grid>
            </AppContent>
        )
    }
}