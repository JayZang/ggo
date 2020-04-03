import React, { Component } from 'react'
import { Box, Typography, Divider, Paper, Grid, Avatar } from '@material-ui/core'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ScheduleIcon from '@material-ui/icons/Schedule';
import styled from 'styled-components'
import clsx from 'clsx'

import { IWorkReport } from 'contracts/workReport'

type IProps = {
    className?: string
    workReport: IWorkReport
}

class WorkReportDisplayPanel extends Component<IProps> {
    render() {
        const {
            className,
            workReport
        } = this.props

        return (
            <Box className={clsx(className, 'p-4')}>
                <Box className="d-flex align-items-center">
                    <Box>
                        <Typography variant="h4">{workReport.title}</Typography>
                        <Box className="mt-2 d-flex align-items-center">
                            <Typography component="div" variant="body2">
                                <Box className="d-flex align-items-center" color="text.hint">
                                    <CalendarTodayIcon className="mr-1" fontSize="small" /> {workReport.create_at.format('YYYY-MM-DD')}
                                </Box>
                            </Typography>
                            <Box marginX={1} />
                            <Typography component="div" variant="body2">
                                <Box className="d-flex align-items-center" color="text.hint">
                                    <ScheduleIcon className="mr-1" fontSize="small" /> {workReport.spend_time}
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                    <Box marginLeft="auto">
                        {workReport.submitter && (
                            <Box minWidth={170}>
                                <Paper className="px-3 py-2">
                                    <Grid container alignItems="center" spacing={2}>
                                        <Avatar src={workReport.submitter.avatar} />
                                        <Grid item>
                                            <Grid container direction="column">
                                                <Typography component="div">
                                                    <Box fontWeight="bold">{workReport.submitter.name}</Box>
                                                </Typography>
                                                <Typography variant="body2" component="div">
                                                    <Box color="text.hint">提交者</Box>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Box>
                        )}
                    </Box>
                </Box>
                <Divider className="mt-2 mb-4" />
                <Typography component="div">
                    <div dangerouslySetInnerHTML={{ __html: workReport.content }} />
                </Typography>
            </Box>
        )
    }
}

export default styled(WorkReportDisplayPanel)`
    img {
        max-width: 100%;
    }
`