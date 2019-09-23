import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'

import './App.css';
import Header from 'components/Header'
import LeftDrawerMenu from 'components/LeftDrawerMenu'
import MobileBottomBar from 'components/MobileBottomBar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Header />
        <LeftDrawerMenu />
        <MobileBottomBar />
      </div>
    )
  }
}

export default App;
