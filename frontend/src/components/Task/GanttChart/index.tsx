import React, { Component } from 'react'
import Chart from "react-google-charts"
import styled from 'styled-components'
import { green } from '@material-ui/core/colors'
import { ITask, TaskStatus } from 'contracts/task'

type IProps = {
    className?: string
    tasks: ITask[]
}

class TasksGanttChart extends Component<IProps> {
    render() {
        const { className, tasks } = this.props

        return (
            <Chart
                className={className}
                width={'100%'}
                height={'auto'}
                chartType="Gantt"
                loader={<div>Loading Chart</div>}
                chartLanguage="zh-tw"
                data={[
                    [
                        { type: 'string', label: 'Task ID' },
                        { type: 'string', label: 'Task Name' },
                        { type: 'date', label: 'Start Date' },
                        { type: 'date', label: 'End Date' },
                        { type: 'number', label: 'Duration' },
                        { type: 'number', label: 'Percent Complete' },
                        { type: 'string', label: 'Dependencies' },
                    ],
                    ...(tasks || []).map(task => [
                        task.id,
                        task.name,
                        task.start_datetime.toDate(),
                        task.deadline_datetime.toDate(),
                        null,
                        task.status === TaskStatus.Completed ? 100 : 0,
                        null,
                    ])
                ]}
                options={{
                    height: tasks.length * 30 + 50,
                    gantt: {
                        trackHeight: 30
                    },
                }}
            />
        )
    }
}

export default styled(TasksGanttChart)`
    path[fill="#2a56c6"] {
        fill: ${green[200]};
    }
    path[fill="#204195"] {
        fill: ${green[600]};
    }
`