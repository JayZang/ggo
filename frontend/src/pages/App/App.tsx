import queryString from 'query-string'
import { Box } from '@material-ui/core'
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withSnackbar, WithSnackbarProps } from 'notistack'

import RequestLoadingBar from 'components/RequestLoadingBar'
import MobileBottomBar from 'components/MobileBottomBar'
import LineAccountLinkPage from 'pages/LineAccountLink'
import MenuDrawer from 'components/MenuDrawer'
import ContentWrapper from './ContentWrapper'
import Header from 'components/Header'
import { IUser } from 'contracts/user'
import AuthPage from 'pages/Auth'

type IProps = WithSnackbarProps & {
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

    componentWillReceiveProps(nextProps: IProps) {
        const currentProps = this.props

        if (currentProps.user && !nextProps.user)
            this.props.enqueueSnackbar('已登出系統', {
                variant: 'info'
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
                            <Route path="/line/account-link" render={props => {
                                let linkToken = queryString.parse(props.location.search).linkToken
                                linkToken = typeof linkToken === 'string' ? linkToken : undefined
                                return <LineAccountLinkPage linkToken={linkToken} />
                            }} />
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

export default withSnackbar(App)
