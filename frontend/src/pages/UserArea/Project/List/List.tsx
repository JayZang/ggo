import React, { Component } from 'react'
import { Typography, Box, Divider, Grid, Paper } from '@material-ui/core'
import { green, blue, lime, amber } from '@material-ui/core/colors'

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'

class ProjectCountCard extends Component<{
    title: string
    count: number
    color?: string
    bgcolor?: string
}> {
    render() {
        const {
            title,
            count,
            color,
            bgcolor
        } = this.props

        return (
            <Paper
                elevation={2}
                className="p-3 d-flex align-items-center"
                style={{ background: bgcolor, color }}
            >
                <Typography component="div">
                    <Box fontWeight="bold" fontSize={18}>
                        {title}
                    </Box>
                </Typography>
                <Typography component="div" className="ml-auto">
                    <Box fontWeight="bold" fontSize={32}>
                        {count}
                    </Box>
                </Typography>
            </Paper>
        )
    }
}

class ProjectListPage extends Component {
    render() {
        return (
            <AppContent
                mobileHeader={(
                    <MobileHeader
                        title="我管理的專案"
                        defaultHidden={false}
                    />
                )}
            >
                <Typography variant="h5" component="div">
                    <Box fontWeight={500}>我管理的專案</Box>
                </Typography>
                <Typography variant="subtitle2" component="div">
                    <Box color="text.hint">追蹤你所管理的專案，訂定工作任務並交付給指定成員吧！</Box>
                </Typography>
                <Divider className="mt-2 mb-3" />
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <ProjectCountCard
                            title="我管理的專案"
                            count={7}
                            color="white"
                            bgcolor={`linear-gradient(10deg, ${lime[600]} 30%, ${lime[300]} 100%)`}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ProjectCountCard
                            title="完成的專案"
                            count={7}
                            color="white"
                            bgcolor={`linear-gradient(10deg, ${green[500]} 30%, ${green[200]} 100%)`}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ProjectCountCard
                            title="專案進行中"
                            count={7}
                            color="white"
                            bgcolor={`linear-gradient(10deg, ${blue[500]} 30%, ${blue[200]} 100%)`}
                        />
                    </Grid>
                </Grid>
            </AppContent>
        )
    }
}

export default ProjectListPage