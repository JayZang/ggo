import React, { Component } from 'react'
import { Switch, Route} from 'react-router-dom'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import styles from './styles'
import Members from 'components/Members'

interface IProps extends WithStyles<typeof styles> {
  isLeftDrawerOpen: boolean
}

class AppContentContainer extends Component<IProps> {  
  render() {
    const classes = this.props.classes

    return (
      <div id="app-content-container" className={clsx({
        [classes.appContentContainer]: true,
        'drawer-open': this.props.isLeftDrawerOpen
      })}>
        <div className={classes.toolbar}></div>
        <div className={classes.wrapper}>
          <Switch>
            <Route path="/members" component={Members} />
            <Route path="/customers" />
            <Route path="/outsourcing" />
          </Switch>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(AppContentContainer)