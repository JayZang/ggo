import React, { Component } from 'react'
import { Paper, Typography, Box, Divider, ButtonGroup, Button } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AddIcon from '@material-ui/icons/Add';

import WorkReportDisplayPanel from 'components/WorkReport/WorkReportPanel/WorkReportDisplayPanel'
import WorkReportEditPanel from 'components/WorkReport/WorkReportPanel/WorkReportEditPanel'
import WorkReportList from 'components/WorkReport/WorkReportPanel/WorkReportList'
import { ITask, TaskStatus } from 'contracts/task';
import { IWorkReport } from 'contracts/workReport';

enum TabIndex {
    default = 0,
    edit = 1,
    info = 2
}

type IProps = {
    task: ITask | null
    editable: boolean
}

type IState = {
    tabIndex: number
    workReportToEdit?: IWorkReport | null
    workReportToDisplay?: IWorkReport | null
}

class WorkReportPanel extends Component<IProps, IState> {
    constructor(props: any) {
        super(props)

        this.handleCreateBtnClick = this.handleCreateBtnClick.bind(this)
        this.handleEditBtnClick = this.handleEditBtnClick.bind(this)
        this.handleViewBtnClick = this.handleViewBtnClick.bind(this)
        this.handleBackBtnClick = this.handleBackBtnClick.bind(this)
        this.state = {
            tabIndex: TabIndex.default,
            workReportToEdit: null
        }
    }

    handleCreateBtnClick() {
        this.setState({ 
            tabIndex: TabIndex.edit,
            workReportToEdit: null
        })
    }

    handleEditBtnClick(workReport: IWorkReport) {
        this.setState({ 
            tabIndex: TabIndex.edit ,
            workReportToEdit: workReport
        })
    }

    handleViewBtnClick(workReport: IWorkReport) {
        this.setState({ 
            tabIndex: TabIndex.info ,
            workReportToDisplay: workReport
        })
    }

    handleBackBtnClick() {
        this.setState({ tabIndex: TabIndex.default })
    }

    isDisplay(tabIndex: TabIndex) {
        return tabIndex === this.state.tabIndex ? 'block' : 'none'
    }

    getPanelTitle() {
        if (this.state.tabIndex === TabIndex.default) {
            const task = this.props.task
            return `工作報告${task && task.workReports ? ` (${task.workReports.length})` : '' }`
        }
        else if (this.state.tabIndex === TabIndex.edit)
            return `${this.state.workReportToEdit ? '編輯' : '新增'}工作報告`
        else if (this.state.tabIndex === TabIndex.info)
            return '工作報告內容'
    }

    render() {
        const {
            task,
            editable
        } = this.props
        const {
            tabIndex,
            workReportToEdit,
            workReportToDisplay
        } = this.state

        return (
            <Paper>
                <Box className="p-3 d-flex align-items-center">
                    <Typography className="mr-auto d-flex align-items-center" variant="h5" component="div">
                        <LibraryBooksIcon />
                        <Box className="ml-2" fontWeight={500}>
                            {this.getPanelTitle()}
                        </Box>
                    </Typography>
                    <ButtonGroup size="small" color="primary">
                        {editable && task && task.status === TaskStatus.Normal && tabIndex === TabIndex.default? (
                            <Button
                                startIcon={<AddIcon />}
                                onClick={this.handleCreateBtnClick}
                            >
                                新增
                            </Button>
                        ) : null}
                        {tabIndex !== TabIndex.default ? (
                            <Button
                                startIcon={<ArrowBackIosIcon />}
                                onClick={this.handleBackBtnClick}
                            >
                                返回
                            </Button>
                        ) : null}
                    </ButtonGroup>
                </Box>
                <Divider />
                <Box>
                    <SwipeableViews
                        axis="x"
                        index={tabIndex}
                        onChangeIndex={index => this.setState({ tabIndex: index })}
                    >
                        <Box className="px-4 py-2" style={{ display: this.isDisplay(TabIndex.default) }}>
                            {editable && task && task.status === TaskStatus.Normal && task.workReports && task.workReports.length === 0 ? (
                                <Button 
                                    color="primary" 
                                    startIcon={<AddIcon />} 
                                    onClick={this.handleCreateBtnClick}
                                    fullWidth 
                                >
                                    新增工作報告
                                </Button>
                            ) : (
                                <WorkReportList 
                                    editable={editable && !!task && task.status === TaskStatus.Normal}
                                    workReports={task && task.workReports ? task.workReports : []}
                                    onWorkReportEditBtnClick={this.handleEditBtnClick}
                                    onWorkReportViewBtnClick={this.handleViewBtnClick}
                                />
                            )}
                        </Box>
                        <Box className="p-4">
                            {tabIndex === TabIndex.edit && task ? (
                                <WorkReportEditPanel 
                                    taskId={task.id}
                                    workReport={workReportToEdit}
                                    onSubmitSuccess={this.handleBackBtnClick}
                                />
                            ) : null}
                        </Box>
                        <Box>
                            {tabIndex === TabIndex.info && workReportToDisplay ? (
                                <WorkReportDisplayPanel workReport={workReportToDisplay} />
                            ) : null}
                        </Box>
                    </SwipeableViews>
                </Box>
            </Paper>
        )
    }
}

export default WorkReportPanel