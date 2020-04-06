import React, { Component } from 'react'
import { Switch, Route } from 'react-router'

import WorkReportListPage from './List'

class WorkReportRoute extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/work-reports" component={WorkReportListPage} />
            </Switch>
        )
    }
}

export default WorkReportRoute