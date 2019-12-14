import React, { Component } from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import styles from './styles'
import MemberPage from 'pages/Members'
import TeamPage from 'pages/Teams'
import CustomerPage from 'pages/Customer'
import ProjectPage from 'pages/Projects'

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
                    <MemberPage />
                    <TeamPage />
                    <CustomerPage />
                    <ProjectPage />
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(ContentWrapper)