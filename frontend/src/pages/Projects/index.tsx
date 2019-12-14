import React, { Component } from 'react'
import { Switch, Route } from 'react-router'

import ProjectList from './List'

export default class ProjectsPage extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/projects" component={ProjectList} />
            </Switch>
        )
    }
}