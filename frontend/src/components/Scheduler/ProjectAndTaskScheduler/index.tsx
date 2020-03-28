import React, { Component } from 'react'
import { ViewState, EditingState, ChangeSet, Resource } from '@devexpress/dx-react-scheduler'
import { 
    Scheduler, 
    MonthView, 
    WeekView, 
    DayView,
    Appointments, 
    Toolbar, 
    ViewSwitcher ,
    DateNavigator,
    TodayButton,
    AppointmentTooltip,
    Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Paper } from '@material-ui/core';

import CustomViewSwitcher from 'components/Scheduler/CustomComponent/CustomViewSwitcher'
import AppointmentToolTip from 'components/Scheduler/CustomComponent/AppointmentToolTip'
import { IProject } from 'contracts/project';
import { ITask } from 'contracts/task';
import { green, blue } from '@material-ui/core/colors';

type IProps = {
    projects: IProject[]
    tasks: ITask[]
}

export const AppointmentCategoryFieldName = 'category'
export enum AppointmentCategory {
    project = 'project',
    task = 'task'
}

class ProjectAndTaskScheduler extends Component<IProps> {
    resources: Resource[] = [{
        fieldName: AppointmentCategoryFieldName,
        title: 'Catrgory',
        instances: [
            { id: AppointmentCategory.project, text: '專案', color: blue },
            { id: AppointmentCategory.task, text: '工作任務', color: green }
        ]
    }]

    getTaskData() {
        return this.props.tasks.map(task => ({
            title: task.name,
            startDate: task.start_datetime.toDate(),
            endDate: task.deadline_datetime.toDate(),
            category: AppointmentCategory.task,
            task,
        }))
    }

    getProjectData() {
        return this.props.projects.map(project => ({
            title: project.name,
            startDate: project.start_datetime.toDate(),
            endDate: project.deadline_datetime.toDate(),
            category: AppointmentCategory.project,
            project,
        }))
    }

    render() {
        return (
            <Paper>
                <Scheduler
                    data={[
                        ...this.getTaskData(),
                        ...this.getProjectData()
                    ]}
                >
                    <ViewState />

                    <MonthView />
                    {/* <WeekView />
                    <DayView /> */}
                    <Appointments />

                    <Toolbar />
                    <DateNavigator />
                    <TodayButton messages={{
                        today: '今天'
                    }} />
                    {/* <ViewSwitcher 
                        switcherComponent={CustomViewSwitcher}
                    /> */}
                    {/* <EditRecurrenceMenu /> */}
                    <Appointments />
                    <Resources
                        data={this.resources}
                        mainResourceName={AppointmentCategoryFieldName}
                    />
                    <AppointmentToolTip />
                    {/* <AppointmentTooltip /> */}
                    {/* <DragDropProvider /> */}
                </Scheduler>
            </Paper>
        )
    }
}

export default ProjectAndTaskScheduler