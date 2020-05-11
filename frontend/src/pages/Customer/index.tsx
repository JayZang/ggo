import  React , { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import CustomerList from './List'
import CustomerInfo from './Info'

export default class CustomerPage extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/customers" component={CustomerList} />
                <Route exact path="/customers/:id" render={props => <CustomerInfo  id={props.match.params.id} />} />
            </Switch>
        )
    }
}