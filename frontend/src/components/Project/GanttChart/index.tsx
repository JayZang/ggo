import React, { Component } from 'react'
import Chart from "react-google-charts"
import { IProject } from 'contracts/project'
import styled from 'styled-components'
import { green } from '@material-ui/core/colors'

type IProps = {
    className?: string,
    projects: IProject[]
}

class ProjectsGanttChart extends Component<IProps> {
    render() {
        const { className, projects } = this.props

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
                    ...(projects || []).map(project => [
                        project.id,
                        project.name,
                        project.start_datetime.toDate(),
                        project.deadline_datetime.toDate(),
                        null,
                        project.finish_datetime ? 100 : 0,
                        null,
                    ])
                ]}
                options={{
                    height: projects.length * 30 + 50,
                    gantt: {
                        trackHeight: 30
                    },
                }}
            />
        )
    }
}

export default styled(ProjectsGanttChart)`
    path[fill="#2a56c6"] {
        fill: ${green[200]};
    }
    path[fill="#204195"] {
        fill: ${green[600]};
    }
`