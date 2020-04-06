import React, { Component } from 'react'
import { Box, TablePagination } from '@material-ui/core'

import WorkReportItem from './WorkReportItem'
import { IWorkReport } from 'contracts/workReport'

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
                    <Box key={workReport.id}>
                        <WorkReportItem
                            editable={this.props.editable && workReport.submitter_id === userMemberId}
                            workReport={workReport}
                            onEditBtnClick={() => this.props.onWorkReportEditBtnClick(workReport)}
                            onViewBtnClick={() => this.props.onWorkReportViewBtnClick(workReport)}
                        />
                    </Box>
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