import React, { Component } from 'react'
import { Paper, Typography, Box, Divider, ButtonGroup, Button } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AddIcon from '@material-ui/icons/Add';

import WorkReportEditPanel from './WorkReportEditPanel'

enum TabIndex {
    default = 0,
    edit = 1
}

type IState = {
    tabIndex: number
}

class WorkReportPanel extends Component<{}, IState> {
    constructor(props: any) {
        super(props)

        this.handleEditBtnClick = this.handleEditBtnClick.bind(this)
        this.handleBackBtnClick = this.handleBackBtnClick.bind(this)
        this.state = {
            tabIndex: TabIndex.default
        }
    }

    handleEditBtnClick() {
        this.setState({ tabIndex: TabIndex.edit })
    }

    handleBackBtnClick() {
        this.setState({ tabIndex: TabIndex.default })
    }

    isDisplay(tabIndex: TabIndex) {
        return tabIndex === this.state.tabIndex ? 'block' : 'none'
    }

    render() {
        const {
            tabIndex
        } = this.state

        return (
            <Paper>
                <Box className="p-3 d-flex align-items-center">
                    <Typography className="mr-auto" variant="h5" component="div">
                        <Box fontWeight={500}>工作報告</Box>
                    </Typography>
                    <ButtonGroup size="small" color="primary">
                        {tabIndex === TabIndex.default ? (
                            <Button 
                                startIcon={<AddIcon />} 
                                onClick={this.handleEditBtnClick}
                            >
                                新增
                            </Button>
                        ) : (
                            <Button
                                startIcon={<ArrowBackIosIcon />} 
                                onClick={this.handleBackBtnClick}
                            >
                                返回
                            </Button>
                        )}
                    </ButtonGroup>
                </Box>
                <Divider />
                <Box>
                    <SwipeableViews
                        axis="x"
                        index={tabIndex}
                        onChangeIndex={index => this.setState({ tabIndex: index })}
                    >
                        <Box className="px-3 py-2" style={{ display: this.isDisplay(TabIndex.default) }}>
                            <Button 
                                color="primary" 
                                startIcon={<AddIcon />} 
                                onClick={this.handleEditBtnClick}
                                fullWidth 
                            >
                                新增工作報告
                            </Button>
                        </Box>
                        <Box className="p-4">
                            {tabIndex === TabIndex.edit ? (
                                <WorkReportEditPanel />
                            ) : null}
                        </Box>
                    </SwipeableViews>
                </Box>
            </Paper>
        )
    }
}

export default WorkReportPanel