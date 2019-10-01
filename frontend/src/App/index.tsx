import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import './App.css'
import LoadingBar from 'components/LoadingBar'
import Header from 'components/Header'
import MenuDrawer from 'components/MenuDrawer'
import MobileBottomBar from 'components/MobileBottomBar'
import AppWrapper from 'components/AppWrapper'

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <LoadingBar />
        <Header />
        <MenuDrawer />
        <AppWrapper />
        <MobileBottomBar />
      </div>
    )
  }
}

export default App
