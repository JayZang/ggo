import React, { Component } from 'react'
import { Grid, Paper, Typography, Box, Divider, ButtonGroup, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

import AssignmentLabel from 'components/Task/AssignmentLabel'
import TaskStatusLabel from 'components/Task/StatusLabel'
import MobileHeader from 'components/MobileHeader'
import AppContent from 'pages/App/Content'
import { ITask } from 'contracts/task'

type IProps = {
    task: ITask | null
    taskId: string
    init: (id: number) => Promise<void>
}

type IState = {
    initialed: boolean
}

class TaskDetail extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            initialed: false
        }
    }

    componentDidMount() {
        this.props.init(Number(this.props.taskId)).then(() => {
            this.setState({ initialed: true })
        })
    }

    render() {
        const task = this.state.initialed ? this.props.task : null

        return (
            <AppContent
                mobileHeader={(
                    <MobileHeader
                        title="任務資訊"
                        defaultHidden={false}
                    />
                )}
            >
                <Grid container spacing={3}>
                    <Grid item style={{ minWidth: 400 }}>
                        <Paper>
                            <Typography className="p-3 d-flex align-items-cente" variant="h5" component="div">
                                <Box marginRight="auto" fontWeight={500}>{task && task.name}</Box>
                                {task && (
                                    <TaskStatusLabel task={task} editable={false} />
                                )}
                            </Typography>
                            <Divider />
                            <Box className="p-3 d-flex align-items-center">
                                <Typography className="flex-shrink-0" variant="subtitle2" style={{ width: 115 }}>
                                    描述
                                </Typography>
                                <Typography style={{ whiteSpace: 'pre-line' }} variant="body2">
                                    {task && task.description}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box className="p-3 d-flex align-items-center" bgcolor="grey.100">
                                <Typography className="flex-shrink-0" variant="subtitle2" style={{ width: 115 }}>
                                    所屬專案
                                </Typography>
                                <Typography>
                                    {task && task.project && (
                                        <Box className="d-flex align-items-center">
                                            {task.project.name}
                                            {task.project.finish_datetime || true ? <Box component="span" className="badge badge-success ml-1">已結案</Box> : null}
                                        </Box>
                                    )}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box className="p-3 d-flex align-items-center">
                                <Typography className="flex-shrink-0" variant="subtitle2" style={{ width: 115 }}>
                                    負責對象
                                </Typography>
                                {task && (
                                    <Paper className="px-3 py-2 w-100">
                                        <AssignmentLabel task={task} disableLink={true} />
                                    </Paper>
                                )}
                            </Box>
                            <Divider />
                            <Box className="p-3 d-flex align-items-center"  bgcolor="grey.100">
                                <Typography className="flex-shrink-0" variant="subtitle2" style={{ width: 115 }}>
                                    起始日期
                                </Typography>
                                <Typography>
                                    {task && task.start_datetime.format('YYYY-MM-DD')}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box className="p-3 d-flex align-items-center">
                                <Typography className="flex-shrink-0" variant="subtitle2" style={{ width: 115 }}>
                                    最後期限日期
                                </Typography>
                                <Typography>
                                    {task && task.deadline_datetime.format('YYYY-MM-DD')}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box className="p-3 d-flex align-items-center"  bgcolor="grey.100">
                                <Typography className="flex-shrink-0" variant="subtitle2" style={{ width: 115 }}>
                                    完成日期
                                </Typography>
                                <Typography>
                                    {task && task.finish_datetime && task.finish_datetime.format('YYYY-MM-DD')}
                                </Typography>
                            </Box>

                            <Divider />
                            <Box className="p-3 d-flex align-items-center">
                                <Typography className="flex-shrink-0" variant="subtitle2" style={{ width: 115 }}>
                                    備註
                                </Typography>
                                <Typography style={{ whiteSpace: 'pre-line' }} variant="body2">
                                    {task && task.remark}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item className="flex-grow-1">
                        <Paper>
                            <Box className="p-3 d-flex align-items-center">
                                <Typography className="mr-auto" variant="h5" component="div">
                                    <Box fontWeight={500}>工作報告</Box>
                                </Typography>
                                <ButtonGroup size="small" color="primary">
                                    <Button startIcon={<AddIcon />}>新增</Button>
                                </ButtonGroup>
                            </Box>
                            <Divider />
                            <Box>
                                <Box className="px-3 py-2">
                                    <Button color="primary" startIcon={<AddIcon />} fullWidth>新增工作報告</Button>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </AppContent>
        )
    }
}

export default TaskDetail