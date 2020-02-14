import React, { Component } from 'react'
import { WithStyles } from '@material-ui/styles'
import { Route, Switch, RouteComponentProps, withRouter, matchPath } from 'react-router'
import { Grid, withStyles, Card, CardContent, Tabs, Tab, Divider } from '@material-ui/core'

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import TeamLeaderCard from 'components/Teams/Detail/LeaderCard'
import TeamBaseInfo from 'components/Teams/Detail/BaseInfo'
import TeamMemberList from 'components/Teams/Detail/MemberList'
import styles from './style'
import { ITeam } from 'contracts/team'
import { IMember } from 'contracts/member'

type IProps = WithStyles<typeof styles> & RouteComponentProps & {
    id: number | string
    load: (id: string | number) => Promise<void>,
    team: ITeam | null,
    members: IMember[] | null
}

type IState = {
    tabIndex: number,
    team: ITeam | null,
    members: IMember[]
}

class TeamDetail extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            tabIndex: 0,
            team: null,
            members: []
        }
    }

    componentDidMount() {
        this.props.load(this.props.id)
            .then(() => {
                this.setState({
                    team: this.props.team,
                    members: this.props.members || []
                })
            })
    }

    render() {
        const {
            classes,
        } = this.props
        const {
            tabIndex,
            team,
            members
        } = this.state

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
                        <TeamLeaderCard leader={(team && team.leader) ? team.leader : null} />
                    </Grid>
                    <Grid item className={classes.rightBlock}>
                        <Card>
                            <Tabs 
                                value={tabIndex}
                                onChange={(event, value) => this.setState({ tabIndex: value })}
                                indicatorColor="primary"
                                textColor="primary"
                            >
                                <Tab label="團隊資訊" />
                                <Tab label={`團隊成員 (${members ? members.length : 0})`} />
                                <Tab label={`團隊任務 (0)`} />
                            </Tabs>

                            <Divider />

                            <CardContent className={classes.contentWrapper}>
                                {(() => {
                                    return tabIndex === 0 ? <TeamBaseInfo  team={team} /> : 
                                        (tabIndex === 1 ? <TeamMemberList members={members} /> : '')
                                })()}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </AppContent>
        )
    }
}

export default withStyles(styles)(withRouter(TeamDetail))