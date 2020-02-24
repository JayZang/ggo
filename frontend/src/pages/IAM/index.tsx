import React, { Component } from 'react'
import { Route } from 'react-router'

import IAMMain from 'pages/IAM/Main'

export default class IamPage extends Component {
    render() {
        return (
            <Route path="/iam"  component={IAMMain} />
        )
    }
}