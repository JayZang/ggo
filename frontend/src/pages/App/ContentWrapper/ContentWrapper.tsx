import React, { Component } from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import styles from './styles'
import DashboardPage from 'pages/Dashboard'
import MemberPage from 'pages/Members'
import TeamPage from 'pages/Teams'
import CustomerPage from 'pages/Customer'
import ProjectPage from 'pages/Projects'
import TaskPage from 'pages/Task'
import IamPage from 'pages/IAM'

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
                    <DashboardPage />
                    <MemberPage />
                    <TeamPage />
                    <CustomerPage />
                    <ProjectPage />
                    <TaskPage />
                    <IamPage />
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(ContentWrapper)