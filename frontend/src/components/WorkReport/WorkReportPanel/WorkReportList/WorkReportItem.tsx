import React, { Component } from 'react'
import { Paper, Box, Typography, Button, Tooltip } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

import { IWorkReport } from 'contracts/workReport'
import MemberLabel from 'components/Members/MemberLabel'
import TaskStatusLabel from 'components/Task/StatusLabel'
import moment from 'moment'

type IProps = {
    editable: boolean
    workReport: IWorkReport
    onEditBtnClick?: () => void
    onViewBtnClick?: () => void
    onTaskLabelClick?: () => void
}

class WorkReportItem extends Component<IProps> {
    handleEditBtnClick() {
        this.props.onEditBtnClick && this.props.onEditBtnClick()
    }

    handleViewBtnClick() {
        this.props.onViewBtnClick && this.props.onViewBtnClick()
    }

    handleTaskLabelClick() {
        this.props.onTaskLabelClick && this.props.onTaskLabelClick()
    }

    render() {
        const {
            editable,
            workReport
        } = this.props

        return (
            <Paper className="px-4 py-2 mb-3 d-flex align-items-center">
                <Box flexGrow={1} flexBasis={0} marginRight={1}>
                    <Typography>{workReport.create_at.format('YYYY-MM-DD')}</Typography>
                    <Typography variant="body2" component="div">
                        <Box color="text.hint">提交日期</Box>
                    </Typography>
                </Box>
                <Box flexGrow={1.5} flexBasis={0} marginX={1}>
                    <Typography>{workReport.title}</Typography>
                    <Typography variant="body2" component="div">
                        <Box color="text.hint">標題</Box>
                    </Typography>
                </Box>
                <Box flexGrow={1} flexBasis={0} marginX={1}>
                    <Typography>{workReport.spend_time}</Typography>
                    <Typography variant="body2" component="div">
                        <Box color="text.hint">花費時間</Box>
                    </Typography>
                </Box>
                {workReport.task ? (
                    <Tooltip title="檢視工作任務" placement="bottom-start">
                        <Box flexGrow={1.5} flexBasis={0} marginX={1} style={{ cursor: 'pointer' }} onClick={this.handleTaskLabelClick.bind(this)}>
                            <Typography className="d-flex align-items-center" component="div">
                                {workReport.task.name}
                                <TaskStatusLabel task={workReport.task} editable={false} />
                            </Typography>
                            <Typography variant="body2" component="div">
                                <Box color="text.hint">工作任務</Box>
                            </Typography>
                        </Box>
                    </Tooltip>
                ) : null}
                <Box width={200} marginRight={5} marginX={1}>
                    <MemberLabel
                        member={workReport.submitter}
                        hint="提交者"
                        wrapper={Box}
                    />
                </Box>
                <Box className="d-flex align-items-center" width={130} marginLeft={1}>
                    {editable && moment(workReport.create_at).isSame(moment(), 'day') ? (
                        <Button
                            size="small"
                            color="primary"
                            startIcon={<EditIcon />}
                            onClick={this.handleEditBtnClick.bind(this)}
                        >
                            編輯
                        </Button>
                    ) : null}
                    <Button
                        className="ml-auto"
                        size="small"
                        color="primary"
                        onClick={this.handleViewBtnClick.bind(this)}
                    >
                        查看
                    </Button>
                </Box>
            </Paper>
        )
    }
}

export default WorkReportItem