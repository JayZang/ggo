import  React , { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import CustomerList from './List'

export default class CustomerPage extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/customers" component={CustomerList} />
            </Switch>
        )
    }
}