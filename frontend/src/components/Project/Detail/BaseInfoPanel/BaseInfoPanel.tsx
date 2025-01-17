import React, { Component } from 'react'
import { Box, Typography, Paper, Grid, WithStyles, withStyles, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions, Slide, IconButton } from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { Skeleton } from '@material-ui/lab'
import {
    Edit as EditIcon,
    Done as DoneIcon,
    ErrorOutline as ErrorOutlineIcon
} from '@material-ui/icons'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import moment, { Moment } from 'moment'
import { withSnackbar, WithSnackbarProps } from 'notistack'
import LabelIcon from '@material-ui/icons/Label'
import clsx from 'clsx'

import { IProject, ProjectSrcType } from 'contracts/project'
import ProjectEditDrawer from 'components/Project/ProjectEditPanel/ProjectEditDrawer'
import DownToUpSlideTransition from 'components/Transition/DownToUpSlideTransition'
import MemberAvatarList from 'components/Members/AvatarList'
import MemberParticipantEditDialog from './MemberParticipantEditDialog'
import ProjectManagerEditDialog from './ManagersEditDialog'
import styles from './style'

type IProps = WithStyles<typeof styles> & WithSnackbarProps & {
    project: IProject | null
    editable: boolean
    isCanBeFinished: boolean
    finishProject: (id: number | string, date: Moment) => Promise<void>
}

type IState = {
    openEditDrawer: boolean
    openFinishProjectConfigDialog: boolean
    finishProjectDate: Moment | null
    openManagerEditDialog: boolean
    openMemberParticipantEditDialog: boolean
}

class ProjectBaseInfoPanel extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.handleOpenManagerEditDialog = this.handleOpenManagerEditDialog.bind(this)
        this.handleCloseManagerEditDialog = this.handleCloseManagerEditDialog.bind(this)
        this.handleOpenMemberParticipantEditDialog = this.handleOpenMemberParticipantEditDialog.bind(this)
        this.handleCloseMemberParticipantEditDialog = this.handleCloseMemberParticipantEditDialog.bind(this)
        this.state= {
            openEditDrawer: false,
            openFinishProjectConfigDialog: false,
            finishProjectDate: moment(),
            openManagerEditDialog: false,
            openMemberParticipantEditDialog: false
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

    handleOpenManagerEditDialog() {
        this.setState({ openManagerEditDialog: true })
    }

    handleCloseManagerEditDialog() {
        this.setState({ openManagerEditDialog: false })
    }

    handleOpenMemberParticipantEditDialog() {
        this.setState({ openMemberParticipantEditDialog: true })
    }

    handleCloseMemberParticipantEditDialog() {
        this.setState({ openMemberParticipantEditDialog: false })
    }

    render() {
        const {
            project,
            editable,
            isCanBeFinished,
            classes
        } = this.props
        const {
            openManagerEditDialog,
            openMemberParticipantEditDialog
        } = this.state

        return (
            <Box>
                <Paper>
                    <Box className="pt-3 px-4">
                        {project ? (
                            <Box marginBottom={2}>
                                <Typography variant="h4" component="div">
                                    <Box display="flex" alignItems="center">
                                        <Box fontWeight={500} component="span">
                                            {project.name}
                                        </Box>
                                        {project.finish_datetime ? (
                                            <Typography variant="subtitle2" component="span" className="badge badge-success ml-3 py-0">
                                                已結案
                                            </Typography>
                                        ) : null}
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
                        
                        <Grid container className={clsx(classes.datesBoxRoot, 'shadow-sm')}>
                            <Grid item xs style={{ flexBasis: 'auto' }}>
                                <Box className={classes.datesBoxItem}>
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
                                </Box>
                                <Divider />
                            </Grid>
                            <Divider orientation="vertical" style={{height: 'auto'}} />
                            <Grid item xs style={{ flexBasis: 'auto' }}>
                                <Box className={classes.datesBoxItem}>
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
                                </Box>
                                <Divider />
                            </Grid>
                            <Divider orientation="vertical" style={{height: 'auto'}} />
                            <Grid item xs style={{ flexBasis: 'auto' }}>
                                <Box className={classes.datesBoxItem}>
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
                                </Box>
                                <Divider />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box className="px-4">
                        <Box className="mb-4">
                            <Typography variant="h6">專案管理者</Typography>
                            {project ? (
                                <Box display="flex" alignContent="center">
                                    <MemberAvatarList 
                                        max={15}
                                        spacing="small"
                                        className="ml-3"
                                        members={project.managers || []} 
                                    />
                                    {!editable || project.finish_datetime ? null : (
                                        <IconButton 
                                            size="small"
                                            onClick={this.handleOpenManagerEditDialog}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                </Box>
                            ) : (
                                <Box component="span" width="auto">
                                    <Skeleton width={150} />
                                </Box>
                            )}
                        </Box>

                        <Box className="mb-4">
                            <Typography variant="h6">專案參與者</Typography>
                            {project ? (
                                <Box display="flex" alignContent="center">
                                    {project.member_participants && project.member_participants.length ? (
                                        <MemberAvatarList 
                                            max={15}
                                            spacing="small" 
                                            className="ml-3" 
                                            members={project.member_participants} 
                                        />
                                    ) : null}
                                    {!editable || project.finish_datetime ? null : (
                                        <IconButton 
                                            size="small"
                                            onClick={this.handleOpenMemberParticipantEditDialog}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                </Box>
                            ) : (
                                    <Box component="span" width="auto">
                                        <Skeleton width={150} />
                                    </Box>
                                )}
                        </Box>

                        <Box className="mb-4">
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

                        {project && project.quote && (
                            <Box className="mb-4">
                                <Typography variant="h6">報價</Typography>
                                <Typography className="d-flex align-items-center" component="div">
                                    <Box fontWeight={500} className="mr-1" component="span">
                                        <AttachMoneyIcon fontSize="small" />
                                    </Box>
                                    {project.quote || '無報價'}
                                </Typography>
                            </Box>
                        )}

                        {project && project.remark && (
                            <Box className="mb-4">
                                <Typography variant="h6">備註</Typography>
                                <Typography className={classes.remarkWrapper} component="div">
                                    <Box minHeight={100} whiteSpace="pre">{project && project.remark}</Box>
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Divider />
                    {project && !project.finish_datetime && (editable || isCanBeFinished) ? (
                        <Box className="px-3 py-2 d-flex">
                            {editable ? (
                                <Button
                                    className="flex-grow-1"
                                    color="primary"
                                    startIcon={<EditIcon />}
                                    onClick={() => this.setState({ openEditDrawer: true })}
                                >
                                    <Box whiteSpace="noWrap">編輯專案</Box>
                                </Button>
                            ) : null}
                            {isCanBeFinished ? (
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
                    TransitionComponent={DownToUpSlideTransition}
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

                {project && (
                    <ProjectManagerEditDialog 
                        project={project}
                        open={openManagerEditDialog}
                        onClose={this.handleCloseManagerEditDialog}
                    />
                )}

                {project && (
                    <MemberParticipantEditDialog 
                        project={project}
                        open={openMemberParticipantEditDialog}
                        onClose={this.handleCloseMemberParticipantEditDialog}
                    />
                )}
            </Box>
        )
    }
}

export default withSnackbar(
    withStyles(styles)(ProjectBaseInfoPanel)
)