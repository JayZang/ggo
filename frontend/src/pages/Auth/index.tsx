import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import AuthHeader from 'components/Auth/Header'
import Login from './Login'
import { Box } from '@material-ui/core'
import styled from 'styled-components'

type IProps = {
    className?: string
}

class AuthPage extends Component<IProps> {
    render () {
        const {
            className
        } = this.props

        return (
            <Box className={className}>
                <AuthHeader />
                <Box className="auth-content-container">
                    <Switch>
                        <Route exact path="/auth/login" component={Login} />
                    </Switch>
                </Box>
            </Box>
        )
    }
}

export default styled(AuthPage)`
    height: 100vh;
    display: flex;
    flex-direction: column;

    & .auth-content-container {
        padding: 48px 16px;
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`