import React, { Component } from 'react'
import { WithStyles } from '@material-ui/styles'
import { Route, Switch, RouteComponentProps, withRouter, matchPath } from 'react-router'
import { Grid, withStyles, Card, CardContent, Tabs, Tab, Divider } from '@material-ui/core'

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import TeamLeaderCard from 'components/Teams/Detail/LeaderCard'
import TeamBaseInfo from 'components/Teams/Detail/BaseInfo'
import styles from './style'

type IProps = WithStyles<typeof styles> & RouteComponentProps & {
    id: number | string
}

type IState = {
    tabIndex: number
}

class TeamDetail extends Component<IProps, IState> {
    defaultPath = ''
    membersPath = ''
    tasksPath = ''

    constructor(props: IProps) {
        super(props)

        let tabIndex = 0
        this.defaultPath = props.match.path
        this.membersPath = `${props.match.path}/members`
        this.tasksPath = `${props.match.path}/tasks`

        if (matchPath(props.location.pathname, {
            path: this.membersPath,
            exact: true
        }))
            tabIndex = 1
        else if (matchPath(props.location.pathname, {
            path: this.tasksPath,
            exact: true
        }))
            tabIndex = 2

        this.state = {
            tabIndex
        }
    }

    handleTabChange(event: React.ChangeEvent<{}>, value: any) {
        const {
            match
        } = this.props

        this.setState({ tabIndex: value })

        if (value === 0)
            this.props.history.push(`${match.url}`)
        else if (value === 1)
            this.props.history.push(`${match.url}/members`)
        else if (value === 2)
            this.props.history.push(`${match.url}/tasks`)
    }

    render() {
        const {
            classes
        } = this.props
        const {
            tabIndex
        } = this.state
        const {
            defaultPath,
            membersPath,
            tasksPath
        } = this

        return (
            <AppContent
                mobileHeader={(
                    <MobileHeader
                        title="團隊資訊"
                        defaultHidden={false}
                    />
                )}
            >
                <Grid container spacing={3}>
                    <Grid item className={classes.leftBlock}>
                        <TeamLeaderCard />
                    </Grid>
                    <Grid item className={classes.rightBlock}>
                        <Card>
                            <Tabs 
                                value={tabIndex}
                                onChange={this.handleTabChange.bind(this)}
                                indicatorColor="primary"
                                textColor="primary"
                            >
                                <Tab label="團隊資訊" />
                                <Tab label="團隊成員" />
                                <Tab label="任務列表" />
                            </Tabs>

                            <Divider />

                            <CardContent>
                                <Switch>
                                    <Route exact path={defaultPath} component={TeamBaseInfo}/>
                                    <Route exact path={membersPath} />
                                    <Route exact path={tasksPath} />
                                </Switch>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </AppContent>
        )
    }
}

export default withStyles(styles)(withRouter(TeamDetail))