import React, { Component } from 'react'
import {
    Grid, 
    Button, 
    Paper,
    IconButton,
    InputBase,
    Tooltip,
    WithStyles
} from '@material-ui/core'
import {
    Add as AddIcon,
    Search as SearchIcon,
    Cached as CachedIcon,
    FilterList as FilterListIcon
} from '@material-ui/icons'

import styles from './styles'
import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import { withStyles } from '@material-ui/styles'
import ProjectMenu from 'components/Project/List/ProjectMenu'
import ProjectItemSkeleton from 'components/Project/List/ProjectMenu/ProjectItem/Skeleton'
import ProjectEditDrawer from 'components/Project/ProjectEditPanel/ProjectEditDrawer'
import ProjectCountBar from 'components/Project/List/ProjectCountBar'
import { IProject } from 'contracts/project'

type IProps = WithStyles<typeof styles> & {
    load: () => Promise<void>
    reload: () => Promise<void>
    getProject: () => Promise<void>
    projects: IProject[] | null,
    isProjectAllLoaded: boolean
}

type IState = {
    openDrawer: boolean
}

class ProjectList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.trackScrolling = this.trackScrolling.bind(this)
        this.state = {
            openDrawer: false
        }
    }

    componentDidMount() {
        !this.props.projects && this.props.load()
        document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    async trackScrolling() {
        if (window.innerHeight + window.pageYOffset >= document.body.scrollHeight)
            this.props.getProject()
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
            >
                <Grid container className="align-items-center mb-3">
                    <Grid item>
                        <h3>專案/案件管理</h3>
                        <div className="d-flex mt-1 align-items-center">
                            <Paper className={classes.searchPaper}>
                                <IconButton size="small" >
                                    <SearchIcon />
                                </IconButton>
                                <InputBase
                                    placeholder="搜尋專案/案件"
                                />
                            </Paper>

                            <Tooltip title="過濾設置">
                                <IconButton 
                                    size="small"
                                    color="primary"
                                >
                                    <FilterListIcon />
                                </IconButton>
                            </Tooltip>
                            
                            {(() => {
                                return projects ? 
                                    <Tooltip title="重新載入">
                                        <IconButton 
                                            size="small"
                                            color="primary"
                                            onClick={this.props.reload.bind(this)}
                                        >
                                            <CachedIcon />
                                        </IconButton>
                                    </Tooltip> :
                                    null
                            })()}
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