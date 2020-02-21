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

type IProps = {
    init: () => Promise<void>
    isLogin: boolean
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
            isLogin
        } = this.props

        return (
            <div className="App">
                <CssBaseline />
                <RequestLoadingBar />
                <Switch>
                    <Route path="/auth" render={() => isLogin ? <Redirect to="/" /> : <AuthPage />} />
                    <Route render={() => isLogin ? (
                        <Box>
                            <Header />
                            <MenuDrawer />
                            <ContentWrapper />
                            <MobileBottomBar />
                        </Box>
                    ) : <Redirect to="/auth/login" />} />
                </Switch>
            </div>
        )
    }
}

export default App
