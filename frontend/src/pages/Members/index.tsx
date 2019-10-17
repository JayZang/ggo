import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import MemberMain from './Main'
import MemberInfo from './Info'

export default class MemberPage extends Component {
    render () {
        return (
            <Switch>
                <Route exact path="/members" component={MemberMain}  />
                <Route exact path="/members/:id" render={props => <MemberInfo id={props.match.params.id} />} />
            </Switch>
        )
    }
}