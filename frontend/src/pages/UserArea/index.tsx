import React, { Component } from 'react'
import { Switch, Route } from 'react-router'

import UserTaskPage from './Task'
import UserProjectPage from './Project'

export default class UserAreaPage extends Component {
    render() {
        return (
            <Switch>
                <Route path="/m/projects" component={UserProjectPage} />
                <Route path="/m/tasks" component={UserTaskPage} />
            </Switch>
        )
    }
}