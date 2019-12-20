import React, { Component } from 'react'
import { Switch, Route } from 'react-router'

import ProjectList from './List'
import ProjectDetail from './Detail'

export default class ProjectsPage extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/projects" component={ProjectList} />
                <Route exact path="/projects/:id" component={ProjectDetail} />
            </Switch>
        )
    }
}