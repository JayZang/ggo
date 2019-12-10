import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import styles from './styles'
import Members from 'pages/Members'
import Teams from 'pages/Teams'
import Customer from 'pages/Customer'

interface IProps extends WithStyles<typeof styles> {
    isLeftDrawerOpen: boolean
}

class ContentWrapper extends Component<IProps> {
    render() {
        const {
            classes
        } = this.props

        return (
            <div className={clsx(classes.contentWrapper, {
                'drawer-open': this.props.isLeftDrawerOpen
            })}>
                <div className={classes.wrapper}>
                    <Switch>
                        <Route path="/members" component={Members} />
                        <Route path="/teams" component={Teams} />
                        <Route path="/customers" component={Customer} />
                        <Route path="/outsourcing" />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(ContentWrapper)