import React, { Component } from 'react'
import { Grid, Paper, IconButton, InputBase, Tooltip, WithStyles } from '@material-ui/core'
import {
    Search as SearchIcon,
    Cached as CachedIcon,
    FilterList as FilterListIcon
} from '@material-ui/icons'

import styles from './styles'
import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import { ITask } from 'contracts/task'
import { withStyles } from '@material-ui/styles'
import TaskMenu from 'components/Task/List/TaskMenu'
import TaskItemSkeleton from 'components/Task/List/TaskMenu/TaskItem/Skeleton'

type IProps = WithStyles<typeof styles> & {
    tasks: ITask[] | null
    isAllTasksLoaded: boolean
    load: () => Promise<void>
    fetchTasks: () => Promise<void>
    reload: () => Promise<void>
}

type IStatus = {
    isTaskFetching: boolean
}

class TaskList extends Component<IProps, IStatus> {
    constructor(props: IProps) {
        super(props)

        this.trackScrolling = this.trackScrolling.bind(this)
        this.state = {
            isTaskFetching: false
        }
    }

    componentDidMount() {
        if (!this.props.tasks) {
            this.setState({ isTaskFetching: true }, () => {
                this.props.load().finally(() => {
                    this.setState({ isTaskFetching: false })
                })
            })
        }
        document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    async trackScrolling() {
        if (this.state.isTaskFetching)
            return

        if (window.innerHeight + window.pageYOffset >= document.body.scrollHeight) {
            this.setState({ isTaskFetching: true }, () => {
                this.props.fetchTasks().finally(() => {
                    this.setState({ isTaskFetching: false })
                })
            })
        }
    }

    render() {
        const {
            tasks,
            classes,
            isAllTasksLoaded
        } = this.props

        return (
            <AppContent
                mobileHeader={(
                    <MobileHeader
                        title="工作任務列表"
                        defaultHidden={false}
                    />
                )}
            >
                <Grid container className="align-items-center mb-3">
                    <Grid item>
                        <h3>工作任務項目</h3>
                        <div className="d-flex mt-1 align-items-center">
                            <Paper className={classes.searchPaper}>
                                <IconButton size="small" >
                                    <SearchIcon />
                                </IconButton>
                                <InputBase
                                    placeholder="搜尋工作任務"
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
                                return tasks ? 
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
                </Grid>

                {tasks && <TaskMenu  tasks={tasks} />}
                {isAllTasksLoaded ? null : <TaskItemSkeleton />}
            </AppContent>
        )
    }
}

export default withStyles(styles)(TaskList)