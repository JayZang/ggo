import React, { Component } from 'react'
import {
    Grid, 
    Button, 
    Paper,
    IconButton,
    InputBase,
    Tooltip,
    WithStyles,
    Typography,
    Box
} from '@material-ui/core'
import {
    Add as AddIcon,
    Search as SearchIcon,
    Cached as CachedIcon,
    Equalizer as EqualizerIcon
} from '@material-ui/icons'

import styles from './styles'
import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import { withStyles } from '@material-ui/styles'
import ProjectMenu from 'components/Project/List/ProjectMenu'
import ProjectItemSkeleton from 'components/Project/List/ProjectMenu/ProjectItem/Skeleton'
import ProjectEditDrawer from 'components/Project/ProjectEditPanel/ProjectEditDrawer'
import ProjectCountBar from 'components/Project/List/ProjectCountBar'
import ProjectSearchBar from 'components/Project/List/SearchBar'
import ProjectsGanttChartDialog from 'components/Project/GanttChart/Dialog'
import { IProject } from 'contracts/project'

const PageSymbol = Symbol('Management.Project.List')

type IProps = WithStyles<typeof styles> & {
    load: () => Promise<void>
    reload: () => Promise<void>
    getProject: () => Promise<void>
    projects: IProject[] | null,
    isProjectAllLoaded: boolean
}

type IState = {
    openDrawer: boolean
    isProjectFetching: boolean
    openProjectGanttChart: boolean
}

class ProjectList extends Component<IProps, IState> {
    state = {
        openDrawer: false,
        isProjectFetching: false,
        openProjectGanttChart: false
    }

    componentDidMount() {
        if (!this.props.projects) {
            this.setState({ isProjectFetching: true }, () => {
                this.props.load().finally(() => {
                    this.setState({ isProjectFetching: false })
                })
            })
        }
    }

    handleReloadBtnClick() {
        if (this.state.isProjectFetching)
            return

        this.setState({ isProjectFetching: true }, () => {
            this.props.reload().finally(() => {
                this.setState({ isProjectFetching: false })
            })
        })
    }

    handleScrollBottom() {
        if (this.state.isProjectFetching)
            return
            
        this.setState({ isProjectFetching: true }, () => {
            this.props.getProject().finally(() => {
                this.setState({ isProjectFetching: false })
            })
        })
    }

    render() {
        const {
            classes,
            projects,
            isProjectAllLoaded
        } = this.props
        const {
            openDrawer
        } = this.state

        return (
            <AppContent
                mobileHeader={(
                    <MobileHeader
                        title="專案/案件列表"
                        defaultHidden={false}
                    />
                )}
                onScrollBottom={this.handleScrollBottom.bind(this)}
                pageSymbol={PageSymbol}
            >
                <Grid container alignItems="flex-end" className="mb-3">
                    <Grid item>
                        <Typography variant="h5" component="div">
                            <Box fontWeight={500}>專案/案件管理</Box>
                        </Typography>
                        <div className="d-flex mt-1 align-items-center">
                            <ProjectSearchBar 
                                className="mr-1"
                                placeholder="搜尋專案/案件"
                            />

                            {/* <Tooltip title="過濾設置">
                                <IconButton 
                                    size="small"
                                    color="primary"
                                >
                                    <FilterListIcon />
                                </IconButton>
                            </Tooltip> */}
                            
                            {(() => {
                                return projects ? 
                                    <Tooltip title="重新載入">
                                        <IconButton 
                                            size="small"
                                            color="primary"
                                            onClick={this.handleReloadBtnClick.bind(this)}
                                        >
                                            <CachedIcon />
                                        </IconButton>
                                    </Tooltip> :
                                    null
                            })()}

                            <Tooltip title="甘特圖">
                                <IconButton 
                                    size="small"
                                    color="primary"
                                    onClick={() => this.setState({ openProjectGanttChart: true })}
                                >
                                    <Box style={{ transform: 'rotate(90deg)' }}>
                                        <EqualizerIcon />
                                    </Box>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Grid>
                    <Grid item className="ml-auto">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => this.setState({ openDrawer: true })}
                        >
                            新增專案/案件
                        </Button>
                    </Grid>
                </Grid>

                <ProjectCountBar 
                    className="mb-3" 
                />

                {projects && <ProjectMenu projects={projects} />}
                {isProjectAllLoaded ? null : <ProjectItemSkeleton />}

                <ProjectsGanttChartDialog 
                    projects={projects || []} 
                    open={this.state.openProjectGanttChart}    
                    onClose={() => this.setState({ openProjectGanttChart: false })}
                />

                <ProjectEditDrawer 
                    open={openDrawer}
                    onOpen={() => this.setState({ openDrawer: true })}
                    onClose={() => this.setState({ openDrawer: false })}
                />
            </AppContent>
        )
    }
}

export default withStyles(styles)(ProjectList)