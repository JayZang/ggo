import React, { Component } from 'react'
import { Grid, Box } from '@material-ui/core'
import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'

import ProjectAndTaskScheduler from 'components/Scheduler/ProjectAndTaskScheduler'
import WorkReportList from 'components/Dashboard/WorkReportList'
import ProjectList from 'components/Dashboard/ProjectList'
import TaskList from 'components/Dashboard/TaskList'
import { ITask } from 'contracts/task'
import { IProject } from 'contracts/project'
import { IUser, UserIdentityType } from 'contracts/user'
import { IWorkReport } from 'contracts/workReport'

type IProps = {
    init: (user: IUser) => Promise<void>
    user: IUser | null
    tasks: ITask[]
    projects: IProject[]
    workReports: IWorkReport[]
}

type IState = {
    initialed: boolean
    listedTasks: ITask[],
    displayProjectInCalendar: boolean,
    displayTaskInCalendar: boolean
}

export default class DashboardMain extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            initialed: false,
            listedTasks: [],
            displayProjectInCalendar: true,
            displayTaskInCalendar: true
        }
    }

    componentDidMount() {
        if (!this.props.user)
            return
        this.props.init(this.props.user).then(() => {
            this.setState({ initialed: true })
        })
    }

    render() {
        const {
            user,
            tasks,
            projects,
            workReports
        } = this.props
        const {
            initialed,
            listedTasks,
            displayProjectInCalendar,
            displayTaskInCalendar
        } = this.state

        return user && (
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
                        {user && user.permissions && user.permissions.project_management ? (
                            <Box marginBottom={3}>
                                <ProjectList
                                    projects={projects}
                                    onCheckBoxChange={checked => this.setState({
                                        displayProjectInCalendar: checked
                                    })}
                                />
                            </Box>
                        ) : null}

                        {user && ((user.permissions && user.permissions.project_management) || user.identity_type === UserIdentityType.member) ? (
                            <Box marginBottom={3}>
                                <TaskList
                                    tasks={tasks}
                                    moreLink={(() => {
                                        if (user.identity_type === UserIdentityType.member)
                                            return '/m/tasks'
                                        else if (user.permissions && user.permissions.project_management)
                                            return '/tasks'
                                        return null
                                    })()}
                                    hiddenCheckbox={user && user.permissions && user.permissions.project_management ? false : true}
                                    onListTasksChange={tasks => this.setState({
                                        listedTasks: tasks
                                    })}
                                    onCheckBoxChange={checked => this.setState({
                                        displayTaskInCalendar: checked
                                    })}
                                />
                            </Box>
                        ) : null}

                        <WorkReportList workReports={workReports} />
                    </Grid>
                    <Grid item xs={8}>
                        <ProjectAndTaskScheduler 
                            tasks={initialed && displayTaskInCalendar ? listedTasks : [] } 
                            projects={initialed && displayProjectInCalendar ? projects : [] } 
                        />
                    </Grid>
                </Grid>
            </AppContent>
        )
    }
}