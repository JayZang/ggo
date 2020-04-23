import React, { Component } from 'react'
import { Typography, Box, Divider, Grid, Paper } from '@material-ui/core'
import { green, blue, lime } from '@material-ui/core/colors'

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import { IProject } from 'contracts/project'
import ProjectItem from 'components/Project/List/ProjectMenu/ProjectItem'
import ProjectSkeleton from 'components/Project/List/ProjectMenu/ProjectItem/Skeleton'

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

type IProps = {
    load: () => Promise<void>
    fetchProjects: () => Promise<void>
    projects: IProject[] | null
    countOfTotal: number
    countOfFinished: number
    countOfProcessing: number
    isAllProjectsFetched: boolean
}

type IState = {
    loaded: boolean
    isFetching: boolean
}

class ProjectListPage extends Component<IProps, IState> {
    state = {
        loaded: false,
        isFetching: false
    }

    async componentDidMount() {
        const { projects, countOfTotal } = this.props

        if (!projects || projects.length < countOfTotal)
            await this.props.load()

        this.setState({ loaded: true })
    }

    handleScrollBottom() {
        if (this.state.isFetching)
            return

        this.setState({ isFetching: true }, () => {
            this.props.fetchProjects().finally(() => {
                this.setState({ isFetching: false })
            })
        })
    }

    render() {
        const { 
            projects, 
            countOfTotal, 
            countOfFinished, 
            countOfProcessing
        } = this.props
        const { loaded } = this.state

        return (
            <AppContent
                mobileHeader={(
                    <MobileHeader
                        title="我管理的專案"
                        defaultHidden={false}
                    />
                )}
                onScrollBottom={this.handleScrollBottom.bind(this)}
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
                            count={countOfTotal}
                            color="white"
                            bgcolor={`linear-gradient(10deg, ${lime[600]} 30%, ${lime[300]} 100%)`}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ProjectCountCard
                            title="完成的專案"
                            count={countOfFinished}
                            color="white"
                            bgcolor={`linear-gradient(10deg, ${green[500]} 30%, ${green[200]} 100%)`}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ProjectCountCard
                            title="專案進行中"
                            count={countOfProcessing}
                            color="white"
                            bgcolor={`linear-gradient(10deg, ${blue[500]} 30%, ${blue[200]} 100%)`}
                        />
                    </Grid>
                </Grid>
                <Box marginTop={3}>
                    {loaded && projects ? projects.map(project => (
                        <ProjectItem 
                            key={project.id}
                            project={project}
                        />
                    )) : null}
                    {!loaded || (projects && projects.length < countOfTotal)  ? (
                        <ProjectSkeleton />
                    ) : null}
                </Box>
            </AppContent>
        )
    }
}

export default ProjectListPage