import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import RequestLoadingBar from 'components/RequestLoadingBar'
import Header from 'components/Header'
import MenuDrawer from 'components/MenuDrawer'
import MobileBottomBar from 'components/MobileBottomBar'
import ContentWrapper from './ContentWrapper'
import AuthPage from 'pages/Auth'
import { Switch, Route, Redirect } from 'react-router'
import { Box } from '@material-ui/core'
import { IUser } from 'contracts/user'

type IProps = {
    init: () => Promise<void>
    user: IUser | null
}

type IState = {
    initialed: boolean
}

class App extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            initialed: false
        }
    }

    componentWillMount() {
        this.props.init().then(() => {
            this.setState({ initialed: true })
        })
    }

    render() {
        const {
            initialed
        } = this.state
        const {
            user
        } = this.props

        return (
            <div className="App">
                <CssBaseline />
                <RequestLoadingBar />
                {(() => {
                    return initialed ? (
                        <Switch>
                            <Route path="/auth" render={() => !!user ? <Redirect to="/" /> : <AuthPage />} />
                            <Route render={() => user ? (
                                <Box>
                                    <Header user={user} />
                                    <MenuDrawer user={user} />
                                    <ContentWrapper />
                                    <MobileBottomBar />
                                </Box>
                            ) : <Redirect to="/auth/login" />} />
                        </Switch>
                    ) : null
                })()}
            </div>
        )
    }
}

export default App
