import React, { Component } from 'react'
import { Grid, Paper, IconButton, InputBase, Tooltip, Box, Dialog, Slide, DialogTitle } from '@material-ui/core'
import {
    Search as SearchIcon,
    Cached as CachedIcon,
    FilterList as FilterListIcon
} from '@material-ui/icons'

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import { IWorkReport } from 'contracts/workReport'
import WorkReportItem from 'components/WorkReport/WorkReportPanel/WorkReportList/WorkReportItem'
import WorkReportDisplayPanel from 'components/WorkReport/WorkReportPanel/WorkReportDisplayPanel'
import DownToUpSlideTransition from 'components/Transition/DownToUpSlideTransition'
import { TransitionProps } from '@material-ui/core/transitions'

type IProps = {
    workReports: IWorkReport[] | null
    load: () => Promise<void>
    reload: () => Promise<void>
    fetchWorkReports: () => Promise<void>
}

type IState = {
    isLoading: boolean
    workReportToDispaly: IWorkReport | null
}

const transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class WorkReportListPage extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.trackScrolling = this.trackScrolling.bind(this)
        this.state = {
            isLoading: false,
            workReportToDispaly: null
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
        document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    async trackScrolling() {
        if (this.state.isLoading)
            return

        if (window.innerHeight + window.pageYOffset >= document.body.scrollHeight) {
            this.setState({ isLoading: true }, () => {
                this.props.fetchWorkReports().finally(() => {
                    this.setState({ isLoading: false })
                })
            })
        }
    }

    render() {
        const loaded = !!this.props.workReports
        const workReports = this.props.workReports || []
        const { workReportToDispaly } = this.state

        return (
            <AppContent
                mobileHeader={(
                    <MobileHeader
                        title="工作報告列表"
                        defaultHidden={false}
                    />
                )}
            >
                <Grid container className="align-items-center mb-3">
                    <Grid item>
                        <h3>工作報告列表</h3>
                        <Box className="d-flex mt-2 align-items-center">
                            <Paper className="px-1">
                                <IconButton size="small" >
                                    <SearchIcon />
                                </IconButton>
                                <InputBase placeholder="搜尋工作報告" />
                            </Paper>

                            <Tooltip title="過濾設置">
                                <IconButton size="small" color="primary">
                                    <FilterListIcon />
                                </IconButton>
                            </Tooltip>

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
                            editable={false}
                            workReport={workReport}
                            onViewBtnClick={() => this.setState({ workReportToDispaly: workReport })}
                        />
                    ))}
                </Box>

                <Dialog
                    open={!!workReportToDispaly}
                    onClose={() => this.setState({ workReportToDispaly: null })}
                    TransitionComponent={transition}
                    maxWidth="sm"
                    fullWidth
                >
                    {workReportToDispaly ? (
                        <WorkReportDisplayPanel workReport={workReportToDispaly} />
                    ) : null}
                </Dialog>
            </AppContent>
        )
    }
}

export default WorkReportListPage