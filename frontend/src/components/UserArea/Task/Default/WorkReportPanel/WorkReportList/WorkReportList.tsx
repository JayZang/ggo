import React, { Component } from 'react'
import { Box, Paper, Typography, Button } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

import { IWorkReport, WorkReportSubmitFrom } from 'contracts/workReport'
import moment from 'moment'

type IProps = {
    userMemberId?: string | number | null
    editable: boolean
    workReports: IWorkReport[]
    onWorkReportEditBtnClick: (workReport: IWorkReport) => void
    onWorkReportViewBtnClick: (workReport: IWorkReport) => void
}

class WorkReportList extends Component<IProps> {
    render() {
        const {
            workReports,
            userMemberId
        } = this.props

        return  workReports.length === 0 ? (
            <Box padding={3} textAlign="center">尚無工作報告</Box>
        ) : (
            <Box className="pt-3">
                {workReports.map(workReport => (
                    <Paper className="px-4 py-2 mb-3 d-flex" key={workReport.id}>
                        <Box flexGrow={1} flexBasis={0}>
                            <Typography>{workReport.create_at.format('YYYY-MM-DD')}</Typography>
                            <Typography variant="body2" component="div">
                                <Box color="text.hint">提交日期</Box>
                            </Typography>
                        </Box>
                        <Box flexGrow={1} flexBasis={0}>
                            <Typography>{workReport.title}</Typography>
                            <Typography variant="body2" component="div">
                                <Box color="text.hint">標題</Box>
                            </Typography>
                        </Box>
                        <Box flexGrow={1} flexBasis={0}>
                            <Typography>{workReport.spend_time}</Typography>
                            <Typography variant="body2" component="div">
                                <Box color="text.hint">花費時間</Box>
                            </Typography>
                        </Box>
                        <Box flexGrow={1} flexBasis={0}>
                            <Typography>
                                {(() => {
                                    if (workReport.submit_from === WorkReportSubmitFrom.Web)
                                        return '網站'
                                    else if (workReport.submit_from === WorkReportSubmitFrom.Line)
                                        return 'Line'
                                })()}
                            </Typography>
                            <Typography variant="body2" component="div">
                                <Box color="text.hint">提交方式</Box>
                            </Typography>
                        </Box>
                        <Box className="d-flex align-items-center" width={130}>
                            {this.props.editable && workReport.submitter_id === userMemberId && moment(workReport.create_at).isSame(moment(), 'day') ? (
                                <Button
                                    size="small"
                                    color="primary"
                                    startIcon={<EditIcon />}
                                    onClick={() => this.props.onWorkReportEditBtnClick(workReport)}
                                >
                                    編輯
                                </Button>
                            ) : null}
                            <Button 
                                className="ml-auto" 
                                size="small" 
                                color="primary"
                                onClick={() => this.props.onWorkReportViewBtnClick(workReport)}
                            >
                                查看
                            </Button>
                        </Box>
                    </Paper>
                ))}
            </Box>
        )
    }
}

export default WorkReportList 