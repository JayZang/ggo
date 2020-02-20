import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import RequestLoadingBar from 'components/RequestLoadingBar'
import Header from 'components/Header'
import MenuDrawer from 'components/MenuDrawer'
import MobileBottomBar from 'components/MobileBottomBar'
import ContentWrapper from './ContentWrapper'
import AuthPage from 'pages/Auth'
import { Switch, Router, Route } from 'react-router'
import { Box } from '@material-ui/core'

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <RequestLoadingBar />
        <Switch>
            <Route path="/auth" component={AuthPage} />
            <Route render={() => (
                <Box>
                    <Header />
                    <MenuDrawer />
                    <ContentWrapper />
                    <MobileBottomBar />
                </Box>
            )} />
        </Switch>
      </div>
    )
  }
}

export default App
