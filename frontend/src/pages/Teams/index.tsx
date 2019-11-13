import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import TeamList from './List'

export default class TeamPage extends Component {
    render () {
        return (
            <Switch>
                <Route exact path="/teams" component={TeamList} />
                <Route exact path="/teams/:id" />
            </Switch>
        )
    }
}