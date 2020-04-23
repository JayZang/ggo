import React, { Component } from "react";
import { Box, Grid } from "@material-ui/core";

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import ProjectBaseInfoPanel from 'components/Project/Detail/BaseInfoPanel'
import ProjectTaskList from 'components/Project/Detail/TaskList'
import ProjectEventStream from 'components/Project/Detail/EventStream'
import { IProject } from "contracts/project";
import { ITask } from "contracts/task";
import { withRouter, RouteComponentProps } from "react-router";

type IProps = RouteComponentProps & {
    id: string
    tasks: ITask[] | null
    project: IProject | null
    taskEditable: boolean
    projectFinishable: boolean
    load: (id: string) => Promise<void>
}

type IState = {
    loaded: boolean
}

class ProjectInfo extends Component<IProps, IState> {
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
        const {taskEditable, projectFinishable} = this.props

        return (
            <AppContent
                mobileHeader={
                    <MobileHeader
                        title="專案/案件詳細資訊"
                        defaultHidden={false}
                    />
                }
            >
                <Grid container wrap="nowrap">
                    <Box className="mr-4" width={450} flexShrink={0}>
                        <ProjectBaseInfoPanel 
                            project={project}
                            editable={false}
                            isCanBeFinished={projectFinishable}
                        />
                    </Box>
                    <Box flexGrow={1}>
                        <ProjectTaskList
                            editable={taskEditable}
                            project={project}
                            tasks={tasks}
                            onTaskViewBtnClick={task => this.props.history.push(
                                `${this.props.match.url}/tasks/${task.id}`
                            ) }
                        />
                    </Box>
                    {/* <Grid item xs={4}>
                        <ProjectEventStream />
                    </Grid> */}
                </Grid>
            </AppContent>
        )
    }
}

export default withRouter(ProjectInfo)