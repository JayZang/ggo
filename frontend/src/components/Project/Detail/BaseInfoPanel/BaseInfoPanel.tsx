import React, { Component } from 'react'
import { Box, Typography, Paper, Grid, WithStyles, withStyles, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions, Slide } from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { TransitionProps } from '@material-ui/core/transitions'
import { Skeleton } from '@material-ui/lab'
import {
    Edit as EditIcon,
    Done as DoneIcon,
    ErrorOutline as ErrorOutlineIcon
} from '@material-ui/icons'
import moment, { Moment } from 'moment'
import { withSnackbar, WithSnackbarProps } from 'notistack'
import LabelIcon from '@material-ui/icons/Label'

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
                {project ? (
                    <Box>
                        <Typography variant="h4" component="div">
                            <Box display="flex" alignItems="center">
                                <Box fontWeight={500} component="span">
                                    {project.name}
                                </Box>
                                {project.finish_datetime ? (
                                    <Typography variant="subtitle2" component="span" className="badge badge-success ml-3 py-0">
                                        已結案
                                    </Typography>
                                ): null }
                            </Box>
                        </Typography>
                        {project.description && (
                            <Box>
                                <Box className="mt-1 mb-1" position="relative">
                                    <Divider />
                                    <LabelIcon className={classes.labelIcon} />
                                </Box>
                                <Typography variant="subtitle2" component="div">
                                    <Box whiteSpace="pre-line" color="text.hint" paddingLeft="22px">
                                        {project.description}
                                    </Box>
                                </Typography>
                            </Box>
                        )}
                    </Box>
                ) : (
                    <Skeleton width={300} />
                )}
                <Paper className="mt-2">
                    <Box className="pt-4 px-4">
                        <Grid container className={clsx(classes.datesBoxRoot, 'shadow-sm')}>
                            <Grid item className={classes.datesBoxItem}>
                                {(() => {
                                    if (project) return (
                                        <Typography align="center">
                                            {project.start_datetime.format('YYYY-MM-DD')}
                                        </Typography>
                                    ) 
                                    else return (
                                        <Box width={70} marginX="auto">
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
                                        <Box width={70} marginX="auto">
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
                                        <Box width={70} marginX="auto">
                                            <Skeleton />
                                        </Box>
                                    )
                                })()}
                                <Typography variant="h6" align="center">完成日期</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box className="px-4">
                        <Box className="mb-4">
                            <Box className="mb-4">
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
                            <Box>
                                <Typography variant="h6">專案來源</Typography>
                                <Box>
                                    {(() => {
                                        if (project) {
                                            switch (project.source_type) {
                                                case ProjectSrcType.Internal:
                                                    return (
                                                        <Typography className="badge badge-primary shadow-sm" variant="body2">
                                                            內部專案
                                                        </Typography>
                                                    )
                                                
                                                case ProjectSrcType.Customer:
                                                    if (!project.customer)
                                                        return <Typography className="badge badge-danger shadow">錯誤</Typography>
                                                    return (
                                                        <Grid container direction="row" alignItems="center" wrap="nowrap">
                                                            <Grid item className="mr-3">
                                                                <img src={project.customer!.logo} style={{ width: 48 }} alt="客戶 Logo" />
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
                        {project && project.remark && (
                            <Box>
                                <Typography variant="h6">備註</Typography>
                                <Typography className={classes.remarkWrapper} component="div">
                                    <Box minHeight={100} whiteSpace="pre">{project && project.remark}</Box>
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Divider className="mt-4" />
                    {project && !project.finish_datetime ? (
                        <Box className="px-3 py-2 d-flex">
                            <Button
                                className="flex-grow-1"
                                color="primary"
                                startIcon={<EditIcon />}
                                onClick={() => this.setState({ openEditDrawer: true })}
                            >
                                <Box whiteSpace="noWrap">編輯專案</Box>
                            </Button>
                            {this.props.isCanBeFinished ? (
                                <Button
                                    className="flex-grow-1 text-success ml-1"
                                    startIcon={<DoneIcon />}
                                    onClick={() => this.setState({ openFinishProjectConfigDialog: true })}
                                >
                                    <Box whiteSpace="noWrap">結案設置</Box>
                                </Button>
                            ) : null}
                        </Box>
                    ) : null}
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