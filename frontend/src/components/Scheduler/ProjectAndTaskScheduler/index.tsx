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
import { IProject } from 'contracts/project';
import { ITask } from 'contracts/task';

type IProps = {
    projects?: IProject[]
    tasks?: ITask[]
}

class ProjectAndTaskScheduler extends Component<IProps> {
    render() {
        return (
            <Paper>
                <Scheduler
                    // data={(this.state as any).data}
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
                    <ViewSwitcher 
                        switcherComponent={CustomViewSwitcher}
                    />
                    {/* <EditRecurrenceMenu /> */}
                    <Appointments />
                    <AppointmentTooltip />
                    {/* <DragDropProvider /> */}
                </Scheduler>
            </Paper>
        )
    }
}

export default ProjectAndTaskScheduler