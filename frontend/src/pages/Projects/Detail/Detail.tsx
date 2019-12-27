import React, { Component } from "react";
import { Box, Grid } from "@material-ui/core";

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import ProjectBaseInfoPanel from 'components/Project/Detail/BaseInfoPanel'
import ProjectTaskList from 'components/Project/Detail/TaskList'
import ProjectEventStream from 'components/Project/Detail/EventStream'
import { IProject } from "contracts/project";

type IProps = {
    id: string
    project: IProject | null
    load: (id: string) => Promise<void>
    leave: () => void
}

class ProjectDetail extends Component<IProps> {
    componentDidMount() {
        this.props.load(
            this.props.id
        )
    }

    componentWillUnmount() {
        this.props.leave()
    }

    render() {
        const {
            project
        } = this.props

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
                        <ProjectBaseInfoPanel />
                    </Grid>
                    <Grid item>
                        <Grid container spacing={3}>
                            <Grid item xs={8}>
                                <ProjectTaskList />
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