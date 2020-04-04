import React, { Component } from 'react'
import { Box, Typography, Divider } from '@material-ui/core'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ScheduleIcon from '@material-ui/icons/Schedule';
import DevicesIcon from '@material-ui/icons/Devices';
import styled from 'styled-components'
import clsx from 'clsx'

import { IWorkReport, WorkReportSubmitFrom } from 'contracts/workReport'
import MemberLabel from 'components/Members/MemberLabel'

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
                        <Typography variant="h5">{workReport.title}</Typography>
                        <Box className="mt-2 d-flex align-items-center">
                            <Typography component="div" variant="body2">
                                <Box className="d-flex align-items-center" color="text.hint">
                                    <CalendarTodayIcon className="mr-2" fontSize="small" />{workReport.create_at.format('YYYY-MM-DD')}
                                </Box>
                            </Typography>
                            <Box marginX={2} />
                            <Typography component="div" variant="body2">
                                <Box className="d-flex align-items-center" color="text.hint">
                                    <ScheduleIcon className="mr-2" fontSize="small" />{workReport.spend_time}
                                </Box>
                            </Typography>
                            <Box marginX={2} />
                            <Typography component="div" variant="body2">
                                <Box className="d-flex align-items-center" color="text.hint">
                                    <DevicesIcon className="mr-2" fontSize="small" /> 
                                    {(() => {
                                        if (workReport.submit_from === WorkReportSubmitFrom.Web)
                                            return '網站'
                                        else if (workReport.submit_from === WorkReportSubmitFrom.Line)
                                            return 'Line'
                                        return null
                                    })()}
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                    <Box marginLeft="auto">
                        {workReport.submitter && (
                            <Box minWidth={170}>
                                <MemberLabel member={workReport.submitter} hint="提交者" />
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