import React, { Component } from 'react'
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui'
import { WithStyles, createStyles, withStyles } from '@material-ui/styles'
import { Theme, Box, Typography, Paper, Divider, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import { ITask } from 'contracts/task'
import TaskDetailDialog from 'components/Dashboard/TaskDetailDialog'

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

class _Header extends Component<AppointmentTooltip.HeaderProps & WithStyles<typeof styles>, {
    displayDetailDialog: boolean
}> {
    constructor(props: any) {
        super(props)

        this.state = {
            displayDetailDialog: false
        }
    }

    render() {
        const {
            classes,
            appointmentData,
            ...restProps
        } = this.props
        const {
            displayDetailDialog
        } = this.state
        const task = appointmentData!.task as ITask

        return (
            <AppointmentTooltip.Header
                {...restProps}
                appointmentData={appointmentData}
            >
                <IconButton
                    onClick={() => this.setState({
                        displayDetailDialog: true
                    })}
                >
                    <SearchIcon />
                </IconButton>

                <TaskDetailDialog 
                    task={displayDetailDialog ? task : null} 
                    onClose={() => this.setState({ 
                        displayDetailDialog: false
                    })}
                />
            </AppointmentTooltip.Header>
        )
    }
}

class _Content extends Component<AppointmentTooltip.ContentProps & WithStyles<typeof styles>> {
    render() {
        const {
            classes,
            appointmentData,
            ...restProps
        } = this.props
        const task = appointmentData!.task as ITask

        return (
            <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
                { task.description ? (
                    <Typography className={classes.remarkWrapper} component="div">
                        <Box minHeight={60} whiteSpace="pre">
                            { task.description}
                        </Box>
                    </Typography>
                ) : null }
                <Paper className="mt-2 p-3">
                    <Typography component="div">
                        <Box className="mr-2" color="text.hint" fontSize={14}>所屬專案</Box>
                        <Box fontSize={16} fontWeight={400}>{task.project && task.project.name}</Box>
                    </Typography>
                </Paper>
            </AppointmentTooltip.Content>
        )
    }
}

const Header = withStyles(styles)(_Header)
const Content = withStyles(styles)(_Content)

export default class TaskAppointmentToolTip extends  Component {
    render() {
        return (
            <AppointmentTooltip
                headerComponent={Header}
                contentComponent={Content}
                showCloseButton
            />
        )
    }
}