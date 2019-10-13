import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import RequestLoadingBar from 'components/RequestLoadingBar'
import Header from 'components/Header'
import MenuDrawer from 'components/MenuDrawer'
import MobileBottomBar from 'components/MobileBottomBar'
import Content from './Content'

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <RequestLoadingBar />
        <Header />
        <MenuDrawer />
        <Content />
        <MobileBottomBar />
      </div>
    )
  }
}

export default App
