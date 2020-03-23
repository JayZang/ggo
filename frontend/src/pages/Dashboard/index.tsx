import React, { Component } from 'react'
import { Route, Switch } from 'react-router'

import DashboardMain from './Main'

export default class DashboardPage extends Component {
    render() {
        return (
            <Switch>
                <Route  exact path="/dashboard" component={DashboardMain} />
            </Switch>
        )
    }
}