import React, { Component } from 'react'
import { Box, Typography, Button } from '@material-ui/core'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import TaskStatusLabel from 'components/Task/StatusLabel'
import { ITask } from 'contracts/task'

type IProps = {
    className?: string
    task: ITask
}

class TeamTaskListItem extends Component<IProps> {
    render() {
        const {
            className,
            task
        } = this.props
        
        return (
            <Box className={className}>
                <Typography component="div" className="flex-grow-1">
                    {task.name}
                    <Box color="text.hint" className="field-hint">
                        任務名稱
                    </Box>
                </Typography>

                <Typography component="div" className="flex-grow-1">
                    {task.project && task.project.name}
                    <Box color="text.hint" className="field-hint">
                        所屬專案
                    </Box>
                </Typography>

                <Typography component="div">
                    {task.start_datetime.format('YYYY-MM-DD')}
                    <Box color="text.hint" className="field-hint">
                        起始日期
                    </Box>
                </Typography>

                <Typography component="div">
                    {task.deadline_datetime.format('YYYY-MM-DD')}
                    <Box color="text.hint" className="field-hint">
                        最後期限日期
                    </Box>
                </Typography>

                <Typography component="div">
                    <TaskStatusLabel task={task} editable={false} />
                </Typography>

                <Link to={`/tasks/${task.id}`}>
                    <Button
                        color="primary"
                        variant="outlined"
                        size="small"
                    >
                        查看
                    </Button>
                </Link>
            </Box>
        )
    }
}

export default styled(TeamTaskListItem)`
    display: flex;
    align-items: center;
    padding: 12px 24px;

    & > * + * {
        margin-left: 40px!important;
    }

    & > .flex-grow-1 {
        flex-grow: 1;
        flex-basis: 0;
    }

    & .field-hint {
        font-size: 14px;
    }
`