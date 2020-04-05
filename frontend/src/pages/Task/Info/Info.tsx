import React, { Component } from 'react'

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import TaskBasicInfoPanel from 'components/Task/BasicInfoPanel'
import WorkReportPanel from 'components/WorkReport/WorkReportPanel'
import { ITask } from 'contracts/task'
import { Grid } from '@material-ui/core'

type IProps = {
    id: number | string
    task: ITask | null
    load: (id: number | string) => Promise<void>
}

type IStatus = {
    loaded: boolean
}

class TaskInfo extends Component<IProps, IStatus> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        this.props.load(this.props.id).then(() => {
            this.setState({ loaded: true })
        })
    }

    render() {
        const task = this.state.loaded ? this.props.task : null

        return (
            <AppContent
                mobileHeader={(
                    <MobileHeader
                        title="工作任務"
                        defaultHidden={false}
                    />
                )}
            >
                <Grid container spacing={3} wrap="nowrap">
                    <Grid item style={{ minWidth: 400 }}>
                        <TaskBasicInfoPanel task={task} />
                    </Grid>
                    <Grid item className="flex-grow-1">
                        <WorkReportPanel task={task} editable={false} />
                    </Grid>
                </Grid>
            </AppContent>
        )
    }
}

export default TaskInfo