import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { Dialog, DialogProps, Paper, DialogTitle, Box, DialogContent, Typography, Theme, createStyles, WithStyles, Grid, IconButton, DialogActions, Divider, Slide, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views';
import EventNoteIcon from '@material-ui/icons/EventNote'
import CloseIcon from '@material-ui/icons/Close'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import TaskIcon from '@material-ui/icons/Assignment';
import clsx from 'clsx';

import DownToUpSlideTransition from 'components/Transition/DownToUpSlideTransition'
import ProjectSourceLabel from 'components/Project/ProjectSourceLabel'
import TaskStatusLabel from 'components/Task/StatusLabel'
import { IProject } from 'contracts/project'
import { TaskStatus } from 'contracts/task'

const styles = (theme: Theme) => createStyles({
    DialogRoot: {
        '& .react-swipeable-view-container > div': {
            transition: '.4s ease',
            '&[aria-hidden="true"]': {
                maxHeight: 1,
                opacity: 0,
            }
        }
    },
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
    project?: IProject | null
}

type IState = {
    displayTasks: boolean
}

class ProjectDetailDialog extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.handleClose = this.handleClose.bind(this)
        this.state = {
            displayTasks: false
        }
    }

    handleClose(event: any) {
        const onClose = this.props.onClose

        this.setState({
            displayTasks: false
        })
        onClose && onClose(event, 'backdropClick')
    }

    render() {
        const {
            project,
            classes,
            className,
            ...restProps
        } = this.props
        const {
            displayTasks
        } = this.state

        return (
            <Dialog
                {...restProps}
                className={clsx(className, classes.DialogRoot)}
                open={Boolean(project)}
                fullWidth
                maxWidth="sm"
                TransitionComponent={DownToUpSlideTransition}
                onClose={this.handleClose}
            >
                {project ? (
                    <Box>
                        <DialogTitle>
                            <Typography variant="inherit">
                                { project.name }
                            </Typography>
                            <Box position="absolute" right={8} top={8} >
                                <IconButton 
                                    onClick={this.handleClose}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </DialogTitle>
                        <SwipeableViews
                            className="px-1"
                            axis="x" 
                            index={displayTasks ? 1 : 0} 
                            onChangeIndex={index => this.setState({ displayTasks: !index })}
                        >
                            <DialogContent>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Typography component="div" variant="subtitle2">
                                            <Box color="text.hint" className="d-flex align-items-center">
                                                <EventNoteIcon fontSize="small" className="mr-2" />
                                                {`${project.start_datetime.format('YYYY-MM-DD')} ~ ${project.deadline_datetime.format('YYYY-MM-DD')}`}
                                            </Box>
                                        </Typography>
                                    </Grid>
                                    <Grid item  className="flex-grow-1" />
                                </Grid>

                                <Typography className={classes.remarkWrapper} component="div">
                                    <Box minHeight={60} whiteSpace="pre">
                                        { project.description }
                                    </Box>
                                </Typography>

                                <Grid container spacing={2} className="mt-2">
                                    <Grid item xs={6}>
                                        <Paper className="p-3 h-100">
                                            <Box className="mb-1" color="text.hint" fontSize={14}>專案來源</Box>
                                            <ProjectSourceLabel project={project} />
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Paper className="p-3 h-100">
                                            <Grid container>
                                                <Grid item>
                                                    <Box className="mb-1" color="text.hint" fontSize={14}>進行中任務</Box>
                                                    <Typography component="div" >
                                                        <Box fontSize={30}>
                                                            {project.tasks ? project.tasks.reduce((count, task) => {
                                                                if ([TaskStatus.Normal, TaskStatus.Pause].includes(task.status))
                                                                    count++
                                                                return count
                                                            }, 0) : 0} / {project.tasks ? project.tasks.length : 0}
                                                        </Box>
                                                    </Typography>
                                                </Grid>
                                                <Grid item className="d-flex align-items-center ml-auto">
                                                    <IconButton onClick={() => this.setState({ displayTasks: true })}>
                                                        <ArrowForwardIosIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                </Grid>

                                {project.remark ? (
                                    <Paper className="p-3 mt-3">
                                        <Typography component="div">
                                            <Box color="text.hint" fontSize={14}>備註</Box>
                                        </Typography>
                                        <Typography style={{ whiteSpace: 'pre-line' }}>
                                            { project.remark }
                                        </Typography>
                                    </Paper>
                                ) : null}
                            </DialogContent>
                            <DialogContent>
                                <Paper>
                                    <Box className="d-flex align-items-center p-1">
                                        <IconButton onClick={() => this.setState({ displayTasks: false })}>
                                            <ArrowBackIosIcon />
                                        </IconButton>
                                        <Typography variant="subtitle2" className="ml-1">任務列表</Typography>
                                    </Box>
                                    <Divider className="mt-1" />
                                    <List>
                                        {project.tasks && project.tasks.map(task => (
                                            <ListItem key={task.id}>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <TaskIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={task.name}
                                                    secondary={`${task.start_datetime.format('YYYY-MM-DD')} ~ ${task.deadline_datetime.format('YYYY-MM-DD')}`}
                                                />
                                                <TaskStatusLabel task={task} />
                                            </ListItem>
                                        ))}
                                        {project.tasks && project.tasks.length === 0 ? (
                                            <ListItem>無進行中任務</ListItem>
                                        ) : null}
                                    </List>
                                </Paper>
                            </DialogContent>
                        </SwipeableViews>
                        <DialogActions />
                    </Box>
                ) : ''}
            </Dialog>
        )
    }
}

export default withStyles(styles)(ProjectDetailDialog)