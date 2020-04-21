import React, { Component } from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import styles from './styles'
import DashboardRoute from 'pages/Dashboard'
import MemberRoute from 'pages/Members'
import TeamRoute from 'pages/Teams'
import CustomerRoute from 'pages/Customer'
import ProjectRoute from 'pages/Projects'
import TaskRoute from 'pages/Task'
import WorkReportRoute from 'pages/WorkReport'
import IamRoute from 'pages/IAM'
import UserAreaRoute from 'pages/UserArea'
import ProfileRoute from 'pages/Profile'

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
                    <DashboardRoute />
                    <MemberRoute />
                    <TeamRoute />
                    <CustomerRoute />
                    <ProjectRoute />
                    <TaskRoute />
                    <WorkReportRoute />
                    <IamRoute />
                    <UserAreaRoute />
                    <ProfileRoute />
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(ContentWrapper)