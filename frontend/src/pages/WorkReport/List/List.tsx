import React, { Component } from 'react'
import { Grid, Paper, IconButton, InputBase, Tooltip, Box, Dialog, Typography } from '@material-ui/core'
import { withRouter, RouteComponentProps } from 'react-router'
import {
    Search as SearchIcon,
    Cached as CachedIcon,
} from '@material-ui/icons'

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import { IWorkReport } from 'contracts/workReport'
import WorkReportItem from 'components/WorkReport/WorkReportPanel/WorkReportList/WorkReportItem'
import WorkReportDisplayPanel from 'components/WorkReport/WorkReportPanel/WorkReportDisplayPanel'
import DownToUpSlideTransition from 'components/Transition/DownToUpSlideTransition'
import WorkReportItemSkeleton from 'components/WorkReport/WorkReportPanel/WorkReportList/WorkReportItemSkeleton'

const PageSymbol = Symbol('Management.WorkReport.List')

type IProps = RouteComponentProps & {
    workReports: IWorkReport[] | null
    load: () => Promise<void>
    reload: () => Promise<void>
    fetchWorkReports: () => Promise<void>
}

type IState = {
    isLoading: boolean
    workReportToDisplay: IWorkReport | null
}

class WorkReportListPage extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            isLoading: false,
            workReportToDisplay: null
        }
    }

    load() {
        this.setState({ isLoading: true }, () => {
            this.props.load().finally(() => {
                this.setState({ isLoading: false })
            })
        })
    }

    reload() {
        this.setState({ isLoading: true }, () => {
            this.props.reload().finally(() => {
                this.setState({ isLoading: false })
            })
        })
    }

    componentDidMount() {
        this.props.workReports || this.load()
    }

    handleScrollBottom() {
        if (this.state.isLoading)
            return

        this.setState({ isLoading: true }, () => {
            this.props.fetchWorkReports().finally(() => {
                this.setState({ isLoading: false })
            })
        })
    }

    render() {
        const loaded = !!this.props.workReports
        const workReports = this.props.workReports || []
        const { workReportToDisplay } = this.state

        return (
            <AppContent
                mobileHeader={(
                    <MobileHeader
                        title="工作報告列表"
                        defaultHidden={false}
                    />
                )}
                onScrollBottom={this.handleScrollBottom.bind(this)}
                pageSymbol={PageSymbol}
            >
                <Grid container className="align-items-center mb-3">
                    <Grid item>
                        <Typography variant="h5" component="div">
                            <Box fontWeight={500}>工作報告列表</Box>
                        </Typography>
                        <Box className="d-flex mt-1 align-items-center">
                            <Paper className="px-1 mr-1">
                                <IconButton size="small" >
                                    <SearchIcon />
                                </IconButton>
                                <InputBase placeholder="搜尋工作報告" />
                            </Paper>

                            {/* <Tooltip title="過濾設置">
                                <IconButton size="small" color="primary">
                                    <FilterListIcon />
                                </IconButton>
                            </Tooltip> */}

                            { loaded ? (
                                <Tooltip title="重新載入">
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={this.reload.bind(this)}
                                    >
                                        <CachedIcon />
                                    </IconButton>
                                </Tooltip>
                            ) : null}
                        </Box>
                    </Grid>
                </Grid>
                <Box>
                    {workReports.map(workReport => (
                        <WorkReportItem 
                            key={workReport.id}
                            editable={false}
                            workReport={workReport}
                            onViewBtnClick={() => this.setState({ workReportToDisplay: workReport })}
                            onTaskLabelClick={() => this.props.history.push(`/tasks/${workReport.task!.id}`)}
                        />
                    ))}
                    {loaded ? null : <WorkReportItemSkeleton />}
                </Box>

                <Dialog
                    open={!!workReportToDisplay}
                    onClose={() => this.setState({ workReportToDisplay: null })}
                    TransitionComponent={DownToUpSlideTransition}
                    maxWidth="sm"
                    fullWidth
                >
                    {workReportToDisplay ? (
                        <WorkReportDisplayPanel workReport={workReportToDisplay} />
                    ) : ''}
                </Dialog>
            </AppContent>
        )
    }
}

export default withRouter(WorkReportListPage)