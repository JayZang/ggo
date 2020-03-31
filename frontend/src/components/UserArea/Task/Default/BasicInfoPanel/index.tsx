import React, { Component } from 'react'
import { Paper, Typography, Box, Divider } from '@material-ui/core'

import AssignmentLabel from 'components/Task/AssignmentLabel'
import TaskStatusLabel from 'components/Task/StatusLabel'
import { ITask } from 'contracts/task'

type IProps = {
    task: ITask | null
}

class TaskBasicInfoPanel extends Component<IProps> {
    render() {
        const {
            task
        } = this.props

        return (
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
                    <Typography component="div">
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
        )
    }
}

export default TaskBasicInfoPanel