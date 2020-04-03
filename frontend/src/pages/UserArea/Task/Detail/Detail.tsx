import React, { Component } from 'react'
import { Grid } from '@material-ui/core'

import WorkReportPanel from 'components/UserArea/Task/Default/WorkReportPanel'
import TaskBasicInfoPanel from 'components/UserArea/Task/Default/BasicInfoPanel'
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
                <Grid container spacing={3} wrap="nowrap">
                    <Grid item style={{ minWidth: 400 }}>
                        <TaskBasicInfoPanel task={task} />
                    </Grid>
                    <Grid item className="flex-grow-1">
                        <WorkReportPanel  task={task} />
                    </Grid>
                </Grid>
            </AppContent>
        )
    }
}

export default TaskDetail