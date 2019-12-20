import React, { Component } from "react";
import { Box, Grid } from "@material-ui/core";

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'

class ProjectDetail extends Component {
    render() {
        return (
            <AppContent
                mobileHeader={
                    <MobileHeader
                        title="專案/案件詳細資訊"
                        defaultHidden={false}
                    />
                }
            >
                <Grid container className="align-items-center mb-3">
                    <Grid item>
                        <h3>專案/案件名稱</h3>
                    </Grid>
                </Grid>
            </AppContent>
        )
    }
}

export default ProjectDetail