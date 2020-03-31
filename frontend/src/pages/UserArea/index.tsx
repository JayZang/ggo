import React, { Component } from 'react'
import { Switch, Route } from 'react-router'

import UserTaskPage from './Task'

export default class UserAreaPage extends Component {
    render() {
        return (
            <Route path="/m">
                <Switch>
                    <UserTaskPage />
                </Switch>
            </Route>
        )
    }
}