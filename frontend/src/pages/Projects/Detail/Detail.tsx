import React, { Component } from "react";
import { Box, Grid } from "@material-ui/core";

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import ProjectBaseInfoPanel from 'components/Project/Detail/BaseInfoPanel'
import ProjectTaskList from 'components/Project/Detail/TaskList'
import ProjectEventStream from 'components/Project/Detail/EventStream'
import { IProject } from "contracts/project";
import { ITask, TaskStatus } from "contracts/task";

type IProps = {
    id: string
    project: IProject | null
    tasks: ITask[] | null
    load: (id: string) => Promise<void>
}

type IState = {
    loaded: boolean
}

class ProjectDetail extends Component<IProps, IState> {
    state = {
        loaded: false
    }

    async componentDidMount() {
        const { id, project } = this.props

        if (!project || project.id != id)
            await this.props.load(id)
        this.setState({ loaded: true })
    }

    render() {
        const { loaded } = this.state
        const project = loaded ? this.props.project : null
        const tasks = loaded ? this.props.tasks : null

        return (
            <AppContent
                mobileHeader={
                    <MobileHeader
                        title="專案/案件詳細資訊"
                        defaultHidden={false}
                    />
                }
            >
                <Grid container className="mb-3" direction="column" wrap="nowrap">
                    <Grid item className="mb-4">
                        <ProjectBaseInfoPanel 
                            project={project}
                            isCanBeFinished={!!tasks && !!tasks.length && tasks.reduce<boolean>((preStatus, task) => {
                                return preStatus && [
                                    TaskStatus.Completed, 
                                    TaskStatus.Terminated
                                ].includes(task.status)
                            }, true)}
                        />
                    </Grid>
                    <Grid item>
                        <Grid container spacing={3}>
                            <Grid item xs={8}>
                                <ProjectTaskList 
                                    project={project}
                                    tasks={tasks}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <ProjectEventStream />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </AppContent>
        )
    }
}

export default ProjectDetail