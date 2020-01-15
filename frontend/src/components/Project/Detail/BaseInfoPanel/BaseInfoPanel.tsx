import React, { Component } from 'react'
import { Box, Typography, Paper, Grid, WithStyles, withStyles, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions, Slide } from '@material-ui/core'
import { KeyboardDatePicker, MaterialUiPickersDate } from '@material-ui/pickers'
import { TransitionProps } from '@material-ui/core/transitions'
import { Skeleton } from '@material-ui/lab'
import {
    Edit as EditIcon,
    Done as DoneIcon,
    ErrorOutline as ErrorOutlineIcon
} from '@material-ui/icons'
import moment, { Moment } from 'moment'
import { withSnackbar, WithSnackbarProps } from 'notistack'

import { IProject, ProjectSrcType } from 'contracts/project'
import ProjectEditDrawer from 'components/Project/ProjectEditPanel/ProjectEditDrawer'
import styles from './style'
import clsx from 'clsx'

type IProps = WithStyles<typeof styles> & WithSnackbarProps & {
    project: IProject | null
    finishProject: (id: number | string, date: Moment) => Promise<void>,
    isCanBeFinished: boolean
}

type IState = {
    openEditDrawer: boolean
    openFinishProjectConfigDialog: boolean
    finishProjectDate: Moment | null
}

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

class ProjectBaseInfoPanel extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state= {
            openEditDrawer: false,
            openFinishProjectConfigDialog: false,
            finishProjectDate: moment()
        }
    }

    handleFinishProjectBtnClick() {
        if (!this.props.project || !this.state.finishProjectDate)
            return

        this.props.finishProject(
            this.props.project.id,
            this.state.finishProjectDate
        ).then(() => {
            this.props.enqueueSnackbar(`結案成功！`, {
                variant: 'success'
            })
            this.setState({ openFinishProjectConfigDialog: false })
        })
        .catch(() => {
            this.props.enqueueSnackbar(`結案失敗，請重新整理！`, {
                variant: 'error'
            })
        })
    }

    render() {
        const {
            project,
            classes
        } = this.props

        return (
            <Box>
                <Grid container justify="space-between" alignItems="center" wrap="nowrap">
                    <Grid item>
                        {(() => {
                            if (project) return (
                                <Box>
                                    <Typography variant="h4" component="div" className="mb-1">
                                        <Box display="flex" alignItems="center">
                                            <Box fontWeight={500} component="span">
                                                {project.name}
                                            </Box>
                                            {project.finish_datetime ? (
                                                <Typography variant="h6" component="span" className="badge badge-success ml-3">
                                                    已結案
                                                </Typography>
                                            ): null }
                                        </Box>
                                    </Typography>
                                    <Typography variant="subtitle2" component="div">
                                        <Box whiteSpace="pre">
                                            {project.description}
                                        </Box>
                                    </Typography>
                                </Box>
                            ) 
                            else return (
                                <Skeleton width={300} />
                            )
                        })()}
                    </Grid>
                    {(() => {
                        if (project && !project.finish_datetime) return (
                            <Grid item>
                                {(() => {
                                    if (this.props.isCanBeFinished) return (
                                        <Button 
                                            className="bg-success text-white mr-3"
                                            variant="contained" 
                                            startIcon={<DoneIcon />}
                                            onClick={() => this.setState({ openFinishProjectConfigDialog: true })}
                                        >
                                            <Box whiteSpace="noWrap">結案設置</Box>
                                        </Button>
                                    )
                                })()}
                                <Button 
                                    color="primary" 
                                    variant="contained" 
                                    startIcon={<EditIcon />}
                                    onClick={() => this.setState({ openEditDrawer: true})}
                                >
                                    <Box whiteSpace="noWrap">編輯</Box>
                                </Button>
                            </Grid>
                        )
                    })()}
                </Grid>
                <Paper className="p-4 mt-2">
                    <Box className={clsx(classes.datesBoxRoot, 'shadow-sm')}>
                        <Grid container>
                            <Grid item className={classes.datesBoxItem}>
                                {(() => {
                                    if (project) return (
                                        <Typography align="center">
                                            {project.start_datetime.format('YYYY-MM-DD')}
                                        </Typography>
                                    ) 
                                    else return (
                                        <Box width={150} marginX="auto">
                                            <Skeleton />
                                        </Box>
                                    )
                                })()}
                                <Typography variant="h6" align="center">起始日期</Typography>
                            </Grid>
                            <Divider orientation="vertical" style={{height: 'auto'}} />
                            <Grid item className={classes.datesBoxItem}>
                                {(() => {
                                    if (project) return (
                                        <Typography align="center">
                                            {project.deadline_datetime.format('YYYY-MM-DD')}
                                        </Typography>
                                    ) 
                                    else return (
                                        <Box width={150} marginX="auto">
                                            <Skeleton />
                                        </Box>
                                    )
                                })()}
                                <Typography variant="h6" align="center">最後期限日期</Typography>
                            </Grid>
                            <Divider orientation="vertical" style={{height: 'auto'}} />
                            <Grid item className={classes.datesBoxItem}>
                                {(() => {
                                    if (project) {
                                        return (
                                            <Typography align="center">
                                                {project.finish_datetime ? project.finish_datetime.format('YYYY-MM-DD') : '尚未完成'}
                                            </Typography>
                                        )
                                    } else return (
                                        <Box width={150} marginX="auto">
                                            <Skeleton />
                                        </Box>
                                    )
                                })()}
                                <Typography variant="h6" align="center">完成日期</Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box>
                        <Grid container wrap="nowrap">
                            <Box flexGrow={1} flexBasis={0} className="mr-4">
                                <Box>
                                    <Typography variant="h6">報價</Typography>
                                    {(() => {
                                        if (project) {
                                            return (
                                                <Typography>
                                                    <Box fontWeight={500} className="mr-1" component="span">$</Box>
                                                    {project.quote || '無報價'}
                                                </Typography>
                                            )
                                        } else return (
                                            <Box component="span" width="auto">
                                                <Skeleton width={150} />
                                            </Box>
                                        )
                                    })()}
                                </Box>
                                <Divider className="my-3" />
                                <Box>
                                    <Typography variant="h6">專案來源</Typography>
                                    <Box>
                                        {(() => {
                                            if (project) {
                                                switch (project.source_type) {
                                                    case ProjectSrcType.Internal:
                                                        return (
                                                            <Typography className="badge badge-primary shadow">內部專案</Typography>
                                                        )
                                                    
                                                    case ProjectSrcType.Customer:
                                                        if (!project.customer)
                                                            return <Typography className="badge badge-danger shadow">錯誤</Typography>
                                                        return (
                                                            <Grid container direction="row" alignItems="center" wrap="nowrap">
                                                                <Grid item className="mr-3">
                                                                    <img src={project.customer!.logo} style={{ width: 48 }} />
                                                                </Grid>
                                                                <Grid item>
                                                                    <Typography>{ project.customer.company_name }</Typography>
                                                                    <Typography className={classes.customerFieldHint}>
                                                                        { project.customer.contact } / { project.customer.phone }
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        )
                                                }
                                            } else return (
                                                <Box component="span" width="auto">
                                                    <Skeleton width={150} />
                                                </Box>
                                            )
                                        })()}
                                    </Box>
                                </Box>
                            </Box>
                            <Box flexGrow={1} flexBasis={0}>
                                <Typography variant="h6">備註</Typography>
                                <Typography className={classes.remarkWrapper} component="div">
                                    <Box minHeight={100} whiteSpace="pre">{project && project.remark}</Box>
                                </Typography>
                            </Box>
                        </Grid>
                    </Box>
                </Paper>

                <Dialog
                    open={this.state.openFinishProjectConfigDialog}
                    onClose={() => this.setState({ openFinishProjectConfigDialog: false })}
                    keepMounted
                    maxWidth="sm"
                    TransitionComponent={Transition}
                >
                    <DialogTitle>
                        <Box textAlign="center">結案設置</Box>
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        <Box
                            border="1px solid rgba(0, 0, 0, .2)"
                            borderRadius={10}
                            overflow="hidden"
                        >
                            <KeyboardDatePicker 
                                fullWidth
                                minDate={project ? project.start_datetime.clone().add(1, 'days') : undefined}
                                format="YYYY-MM-DD" 
                                variant="static"
                                value={this.state.finishProjectDate}
                                onChange={date => this.setState({ finishProjectDate: date })}
                            />
                        </Box>
                        <Typography className="alert alert-warning mt-3 d-flex" component="div">
                            <ErrorOutlineIcon fontSize="small" className="mr-2 mt-1" />
                            <span>結案後不能編輯專案及其工作任務！</span>
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Box flexGrow={1} flexBasis={0} marginBottom={1} marginLeft={2}>
                            <Button
                                fullWidth
                                variant="contained" 
                                onClick={() => this.setState({ openFinishProjectConfigDialog: false })}
                            >
                                <Box whiteSpace="noWrap">取消</Box>
                            </Button>
                        </Box>
                        <Box flexGrow={1} flexBasis={0} marginBottom={1} marginRight={2}>
                            <Button 
                                fullWidth
                                className="bg-success text-white"
                                variant="contained" 
                                onClick={this.handleFinishProjectBtnClick.bind(this)}
                            >
                                <Box whiteSpace="noWrap">確認結案</Box>
                            </Button>
                        </Box>
                    </DialogActions>
                </Dialog>

                <ProjectEditDrawer 
                    project={project || undefined}
                    open={this.state.openEditDrawer}
                    onOpen={() => this.setState({ openEditDrawer: true })}
                    onClose={() => this.setState({ openEditDrawer: false })}
                />
            </Box>
        )
    }
}

export default withSnackbar(
    withStyles(styles)(ProjectBaseInfoPanel)
)