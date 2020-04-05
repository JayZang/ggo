import React, { Component } from 'react'
import { Box, Paper, Typography, Button, TablePagination } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import moment from 'moment'

import { IWorkReport } from 'contracts/workReport'
import MemberLabel from 'components/Members/MemberLabel'

type IProps = {
    userMemberId?: string | number | null
    editable: boolean
    workReports: IWorkReport[]
    onWorkReportEditBtnClick: (workReport: IWorkReport) => void
    onWorkReportViewBtnClick: (workReport: IWorkReport) => void
}

type IState = {
    page: number
    rowsPerPage: number
}

class WorkReportList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            page: 0,
            rowsPerPage: 5
        }
    }

    render() {
        const {
            workReports,
            userMemberId
        } = this.props
        const {
            page,
            rowsPerPage
        } = this.state

        return  workReports.length === 0 ? (
            <Box padding={3} textAlign="center">尚無工作報告</Box>
        ) : (
            <Box className="pt-3">
                {workReports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(workReport => (
                    <Paper className="px-4 py-2 mb-3 d-flex align-items-center" key={workReport.id}>
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
                        <Box width={200} marginRight={5}>
                            <MemberLabel 
                                member={workReport.submitter} 
                                hint="提交者"
                                wrapper={Box}
                            />
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
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={workReports.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={(event, page) => this.setState({ page })}
                    onChangeRowsPerPage={event => this.setState({ rowsPerPage: parseInt(event.target.value) })}
                    labelRowsPerPage="每頁筆數"
                    labelDisplayedRows={(pageInfo) => `第${pageInfo.page + 1}頁    ,   ${pageInfo.from}-${pageInfo.to}筆`}
                />
            </Box>
        )
    }
}

export default WorkReportList 