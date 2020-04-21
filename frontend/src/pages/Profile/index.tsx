import React, { Component } from 'react'
import { Switch, Route } from 'react-router'

import ProfileDefaultPage from './Default'

class ProfileRoute extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/profile" component={ProfileDefaultPage} />
            </Switch>
        )
    }
}

export default ProfileRoute