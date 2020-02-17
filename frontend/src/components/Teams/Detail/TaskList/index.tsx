import React, { Component } from 'react'
import { ITask } from 'contracts/task'
import { Box, Divider, Button, Typography } from '@material-ui/core'

import TeamTaskListItem from './TaskItem'

type IProps = {
    tasks: ITask[]
    totalCount: number,
    fetchTasks: () => Promise<void>
}

type IState = {
    fetching: boolean
}

class TeamTaskList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            fetching: false
        }
    }

    handleFetchBtnClick() {
        this.setState({ fetching: true })
        this.props.fetchTasks().then(() => {
            this.setState({ fetching: false })
        })
    }

    render() {
        const {
            tasks,
            totalCount
        } = this.props
        const {
            fetching
        } = this.state

        return (
            <Box paddingTop={2}>
                {tasks.map((task, index) => index === 0 ?
                    <TeamTaskListItem task={task} key={task.id} /> :
                    <Box key={task.id}>
                        <Divider />
                        <TeamTaskListItem task={task}  />
                    </Box>        
                )}
                {(() => {
                    return !fetching && tasks.length === 0 ? (
                        <Typography align="center">
                            尚無任務
                        </Typography>
                    ) : null
                })()}
                {totalCount <= tasks.length ? null :  
                    <Box className="mt-3 text-center px-3">
                        <Button variant="outlined" disabled={fetching} fullWidth onClick={this.handleFetchBtnClick.bind(this)}>
                            載入更多
                        </Button>
                    </Box>
                }
            </Box>
        )
    }
}

export default TeamTaskList