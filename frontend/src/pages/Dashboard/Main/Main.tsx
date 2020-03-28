import React, { Component } from 'react'
import { Grid, Box } from '@material-ui/core'
import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'

import ProjectAndTaskScheduler from 'components/Scheduler/ProjectAndTaskScheduler'
import TaskList from 'components/Dashboard/TaskList'
import ProjectList from 'components/Dashboard/ProjectList'
import { ITask } from 'contracts/task'
import { IProject } from 'contracts/project'
import { IUser } from 'contracts/user'

type IProps = {
    init: (user: IUser) => Promise<void>
    user: IUser | null
    tasks: ITask[]
    projects: IProject[]
}

type IState = {
    listedTasks: ITask[],
    displayProjectInCalendar: boolean,
    displayTaskInCalendar: boolean
}

export default class DashboardMain extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            listedTasks: props.tasks,
            displayProjectInCalendar: true,
            displayTaskInCalendar: true
        }
    }

    componentDidMount() {
        if (!this.props.user)
            return
        this.props.init(this.props.user)
    }

    render() {
        const {
            user,
            tasks,
            projects
        } = this.props
        const {
            listedTasks,
            displayProjectInCalendar,
            displayTaskInCalendar
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

                        <TaskList  
                            tasks={tasks}
                            hiddenCheckbox={user && user.permissions && user.permissions.project_management ? false : true}
                            onListTasksChange={tasks => this.setState({
                                listedTasks: tasks
                            })}
                            onCheckBoxChange={checked => this.setState({
                                displayTaskInCalendar: checked
                            })}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <ProjectAndTaskScheduler 
                            tasks={displayTaskInCalendar ? listedTasks : [] } 
                            projects={displayProjectInCalendar ? projects : [] } 
                        />
                    </Grid>
                </Grid>
            </AppContent>
        )
    }
}