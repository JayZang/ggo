import React, { Component } from 'react'
import { Switch, Route } from 'react-router'

import TaskList from './List'
import TaskInfo from './Info'

export default class TaskPage extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/tasks" component={TaskList} />
                <Route exact path="/tasks/:id" render={props => <TaskInfo id={props.match.params.id} />} />
            </Switch>
        )
    }
}