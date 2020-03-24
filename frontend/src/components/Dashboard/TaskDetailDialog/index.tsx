import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { Dialog, DialogProps, Paper, DialogTitle, Box, DialogContent, Typography, Theme, createStyles, WithStyles, Grid, IconButton, DialogActions } from '@material-ui/core'
import EventNoteIcon from '@material-ui/icons/EventNote'
import CloseIcon from '@material-ui/icons/Close'

import DownToUpSlideTransition from 'components/Transition/DownToUpSlideTransition'
import TaskStatusLabel from 'components/Task/StatusLabel'
import TaskAssignmentLabel from 'components/Task/AssignmentLabel'
import { ITask } from 'contracts/task'

const styles = (theme: Theme) => createStyles({
    remarkWrapper: {
        padding: theme.spacing(2),
        borderColor: theme.palette.grey[300],
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.07)'
    }
})

type IProps = Omit<DialogProps, 'open'> & WithStyles<typeof styles> & {
    task?: ITask | null
}

class TaskDetailDialog extends Component<IProps> {
    render() {
        const {
            task,
            classes,
            ...restProps
        } = this.props

        return (
            <Dialog
                {...restProps}
                open={Boolean(task)}
                fullWidth
                maxWidth="sm"
                TransitionComponent={DownToUpSlideTransition}
            >
                {task ? (
                    <Box>
                        <DialogTitle>
                            <Typography variant="inherit">
                                { task.name }
                            </Typography>
                            <Box position="absolute" right={8} top={8} >
                                <IconButton 
                                    // className={classes.closeButton} 
                                    onClick={event => restProps.onClose && restProps.onClose(event, 'backdropClick')}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </DialogTitle>
                        <DialogContent>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Typography component="div" variant="subtitle2">
                                        <Box color="text.hint" className="d-flex align-items-center">
                                            <EventNoteIcon fontSize="small" className="mr-2" />
                                            {`${task.start_datetime.format('YYYY-MM-DD')} ~ ${task.deadline_datetime.format('YYYY-MM-DD')}`}
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item  className="flex-grow-1" />
                                <Grid item>
                                    <TaskStatusLabel task={task} editable={false} />
                                </Grid>
                            </Grid>

                            <Typography className={classes.remarkWrapper} component="div">
                                <Box minHeight={60} whiteSpace="pre">
                                    { task.description }
                                </Box>
                            </Typography>

                            <Grid container  spacing={2} className="mt-2">
                                <Grid item xs={6}>
                                    <Paper className="p-3">
                                        <Typography component="div">
                                            <Box color="text.hint" fontSize={14}>所屬專案</Box>
                                            <Box fontSize={16} fontWeight={400}>{task.project && task.project.name}</Box>
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className="p-3">
                                        <TaskAssignmentLabel  task={task} />
                                    </Paper>
                                </Grid>
                            </Grid>

                            {task.remark ? (
                                <Paper className="p-3 mt-3">
                                    <Typography component="div">
                                        <Box color="text.hint" fontSize={14}>備註</Box>
                                    </Typography>
                                    <Typography style={{ whiteSpace: 'pre-line' }}>
                                        { task.remark }
                                    </Typography>
                                </Paper>
                            ) : null}
                        </DialogContent>
                        <DialogActions />
                    </Box>
                ) : ''}
            </Dialog>
        )
    }
}

export default withStyles(styles)(TaskDetailDialog)