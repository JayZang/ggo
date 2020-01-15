import React, { Component } from 'react'
import { Switch, Route } from 'react-router'

import TaskList from './List'

export default class TaskPage extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/tasks" component={TaskList} />
            </Switch>
        )
    }
}