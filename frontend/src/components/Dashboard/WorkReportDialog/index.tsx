import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { Dialog, DialogProps, Paper, DialogTitle, Box, DialogContent, Typography, Theme, createStyles, WithStyles, Grid, IconButton, DialogActions } from '@material-ui/core'
import EventNoteIcon from '@material-ui/icons/EventNote'
import CloseIcon from '@material-ui/icons/Close'

import DownToUpSlideTransition from 'components/Transition/DownToUpSlideTransition'
import WorkReportDispalyPanel from 'components/WorkReport/WorkReportDisplayPanel'
import { IWorkReport } from 'contracts/workReport'

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
    workReport?: IWorkReport | null
}

class WorkReportDialog extends Component<IProps> {
    render() {
        const {
            workReport,
            classes,
            ...restProps
        } = this.props

        return (
            <Dialog
                {...restProps}
                open={Boolean(workReport)}
                fullWidth
                maxWidth="sm"
                TransitionComponent={DownToUpSlideTransition}
            >
                {workReport ? (
                    <Box>
                        <DialogTitle>
                            <Typography variant="inherit">
                                工作報告
                            </Typography>
                            <Box position="absolute" right={8} top={8} >
                                <IconButton
                                    onClick={event => restProps.onClose && restProps.onClose(event, 'backdropClick')}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </DialogTitle>
                        <WorkReportDispalyPanel workReport={workReport} />
                        <DialogActions />
                    </Box>
                ) : ''}
            </Dialog>
        )
    }
}

export default withStyles(styles)(WorkReportDialog)