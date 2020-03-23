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

export default class DashboardMain extends Component<IProps> {
    componentDidMount() {
        this.props.init()
    }

    render() {
        const {
            tasks
        } = this.props

        return (
            <AppContent
                mobileHeader={(
                    <MobileHeader
                        title="儀表板"
                        defaultHidden={false}
                    />
                )}
            >
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <TaskList  tasks={tasks} />
                    </Grid>
                    <Grid item xs={8}>
                        <ProjectAndTaskScheduler tasks={tasks} />
                    </Grid>
                </Grid>
            </AppContent>
        )
    }
}