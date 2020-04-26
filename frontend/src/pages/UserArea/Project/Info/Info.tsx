import React, { Component } from "react";
import { Box, Grid } from "@material-ui/core";

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import ProjectBaseInfoPanel from 'components/Project/Detail/BaseInfoPanel'
import ProjectTaskList from 'components/Project/Detail/TaskList'
import ProjectEventStream from 'components/Project/Detail/EventStream'
import TasksStatisticPanel from 'components/Task/Statistic/Panel'
import TasksGanttChartPanel from 'components/Task/GanttChart/Panel'
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
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={4}>
                        <ProjectBaseInfoPanel 
                            project={project}
                            editable={false}
                            isCanBeFinished={projectFinishable}
                        />
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <Grid container direction="column" spacing={3}>
                            <Grid item>
                                <ProjectTaskList
                                    listMaxHeight={390}
                                    editable={taskEditable}
                                    project={project}
                                    tasks={tasks}
                                    onTaskViewBtnClick={task => this.props.history.push(
                                        `${this.props.match.url}/tasks/${task.id}`
                                    ) }
                                />
                            </Grid>

                            {tasks && (
                                <Grid item>
                                    <TasksStatisticPanel tasks={tasks} />
                                </Grid>
                            )}

                            {tasks && tasks.length ? (
                                <Grid item>
                                    <TasksGanttChartPanel tasks={tasks || []} />
                                </Grid>
                            ) : null}
                        </Grid>
                    </Grid>
                    {/* <Grid item xs={4}>
                        <ProjectEventStream />
                    </Grid> */}
                </Grid>
            </AppContent>
        )
    }
}

export default withRouter(ProjectInfo)