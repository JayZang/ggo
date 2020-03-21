import React, { Component } from 'react'
import { Route } from 'react-router'
import { Box } from '@material-ui/core'
import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'

import ProjectAndTaskScheduler from 'components/Scheduler/ProjectAndTaskScheduler'

export default class DashboardPage extends Component {
    render() {
        return (
            <Route  exact path="/dashboard">
                <AppContent
                    mobileHeader={(
                        <MobileHeader
                            title="儀表板"
                            defaultHidden={false}
                        />
                    )}
                >
                    <ProjectAndTaskScheduler />
                </AppContent>
            </Route>
        )
    }
}