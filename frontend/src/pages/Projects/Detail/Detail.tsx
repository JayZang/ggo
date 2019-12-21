import React, { Component } from "react";
import { Box, Grid } from "@material-ui/core";

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import ProjectBaseInfoPanel from 'components/Project/Detail/BaseInfoPanel'
import { IProject } from "contracts/project";

type IProps = {
    id: string
    project: IProject | null
    load: (id: string) => Promise<void>
}

class ProjectDetail extends Component<IProps> {
    componentDidMount() {
        this.props.load(
            this.props.id
        )
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
                <Grid container className="mb-3" direction="column">
                    <Grid item>
                        <ProjectBaseInfoPanel />
                    </Grid>
                </Grid>
            </AppContent>
        )
    }
}

export default ProjectDetail