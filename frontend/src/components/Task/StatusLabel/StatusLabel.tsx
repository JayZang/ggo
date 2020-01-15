import React, { Component } from 'react'
import { Box, Button, Menu, MenuItem } from '@material-ui/core'

import { TaskStatus, ITask } from 'contracts/task'

type IProps = {
    task: ITask
    editable?: boolean
    updateStatus: (id: number | string, status: TaskStatus) => Promise<void>
}

type IStatus = {
    statusBtnAnchorEl: HTMLElement | null
}

class TaskStatusLabel extends Component<IProps, IStatus> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            statusBtnAnchorEl: null
        }
    }

    handleUpdateStatusClick(status: TaskStatus) {
        this.setState({ statusBtnAnchorEl: null })

        if (this.props.task.status === status)
            return

        this.props.updateStatus(
            this.props.task.id,
            status
        )
    }

    render() {
        const {
            task,
            editable
        } = this.props
        const {
            statusBtnAnchorEl
        } = this.state

        return (
            <Box>
                <Button 
                    disableRipple 
                    disabled={!editable}
                    disableFocusRipple onClick={event => this.setState({
                        statusBtnAnchorEl: event.currentTarget
                    })
                }>
                    {(() => {
                        if (task.status === TaskStatus.Normal) {
                            return (
                                <Box className="badge badge-primary">
                                    執行中
                                </Box>
                            )
                        }  else if (task.status === TaskStatus.Pause) { 
                            return (
                                <Box className="badge badge-warning">
                                    暫停中
                                </Box>
                            )
                        } else if (task.status === TaskStatus.Terminated) {
                            return (
                                <Box className="badge badge-danger">
                                    已終止
                                </Box>
                            )
                        } else if (task.status === TaskStatus.Completed) {
                            return (
                                <Box className="badge badge-success">
                                    已完成
                                </Box>
                            )
                        } else {
                            return 'Something Wrong'
                        }
                    })()}
                </Button>
                <Menu
                    anchorEl={statusBtnAnchorEl}
                    keepMounted
                    open={Boolean(statusBtnAnchorEl)}
                    onClose={() => this.setState({ statusBtnAnchorEl: null })}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                >
                    <MenuItem disableRipple
                        onClick={this.handleUpdateStatusClick.bind(this, TaskStatus.Normal)}
                    >
                        執行
                    </MenuItem>
                    <MenuItem disableRipple
                        onClick={this.handleUpdateStatusClick.bind(this, TaskStatus.Pause)}
                    >
                        暫停
                    </MenuItem>
                    <MenuItem disableRipple
                        onClick={this.handleUpdateStatusClick.bind(this, TaskStatus.Terminated)}
                    >
                        終止
                    </MenuItem>
                    <MenuItem disableRipple
                        onClick={this.handleUpdateStatusClick.bind(this, TaskStatus.Completed)}
                    >
                        完成
                    </MenuItem>
                </Menu>
            </Box>
        )
    }
}

export default TaskStatusLabel