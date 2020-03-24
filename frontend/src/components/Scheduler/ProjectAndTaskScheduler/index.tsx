import React, { Component } from 'react'
import { ViewState, EditingState, ChangeSet } from '@devexpress/dx-react-scheduler'
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
} from '@devexpress/dx-react-scheduler-material-ui';
import { Paper } from '@material-ui/core';

import CustomViewSwitcher from 'components/Scheduler/CustomComponent/CustomViewSwitcher'
import TaskAppointmentToolTip from 'components/Scheduler/CustomComponent/TaskAppointmentToolTip'
import { IProject } from 'contracts/project';
import { ITask } from 'contracts/task';

type IProps = {
    projects?: IProject[]
    tasks: ITask[]
}

class ProjectAndTaskScheduler extends Component<IProps> {
    render() {
        const {
            tasks
        } = this.props

        return (
            <Paper>
                <Scheduler
                    data={tasks.map(task => ({
                        title: task.name,
                        startDate: task.start_datetime.toDate(),
                        endDate: task.deadline_datetime.toDate(),
                        task
                    }))}
                >
                    <ViewState />

                    <MonthView />
                    <WeekView />
                    <DayView />
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
                    <TaskAppointmentToolTip />
                    {/* <AppointmentTooltip /> */}
                    {/* <DragDropProvider /> */}
                </Scheduler>
            </Paper>
        )
    }
}

export default ProjectAndTaskScheduler