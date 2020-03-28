import React, { Component } from 'react'
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui'
import { WithStyles, createStyles, withStyles } from '@material-ui/styles'
import { Theme, Box, Typography, Paper, Divider, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import { ITask } from 'contracts/task'
import TaskDetailDialog from 'components/Dashboard/TaskDetailDialog'
import ProjectDetailDialog from 'components/Dashboard/ProjectDetailDialog'
import { 
    AppointmentCategoryFieldName, 
    AppointmentCategory 
} from 'components/Scheduler/ProjectAndTaskScheduler'
import { IProject } from 'contracts/project'

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

        this.handleCloseDialog = this.handleCloseDialog.bind(this)
        this.state = {
            displayDetailDialog: false
        }
    }

    handleCloseDialog() {
        this.setState({
            displayDetailDialog: false
        })
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

        const category = appointmentData![AppointmentCategoryFieldName] as AppointmentCategory
        const project = appointmentData!.project as IProject
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

                {category === AppointmentCategory.task ? (
                    <TaskDetailDialog
                        task={displayDetailDialog ? task : null}
                        onClose={this.handleCloseDialog}
                    />
                ) : (category === AppointmentCategory.project ? (
                    <ProjectDetailDialog 
                        project={displayDetailDialog ? project : null}
                        onClose={this.handleCloseDialog}
                    />
                ) : null) }
            </AppointmentTooltip.Header>
        )
    }
}

const Header = withStyles(styles)(_Header)

export default class AppointmentToolTip extends  Component {
    render() {
        return (
            <AppointmentTooltip
                headerComponent={Header}
                showCloseButton
            />
        )
    }
}