import React, { Component } from 'react'
import { WithStyles } from '@material-ui/styles'
import { Route, Switch, RouteComponentProps, withRouter, matchPath } from 'react-router'
import { Grid, withStyles, Card, CardContent, Tabs, Tab, Divider } from '@material-ui/core'

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import TeamLeaderCard from 'components/Teams/Detail/LeaderCard'
import TeamBaseInfo from 'components/Teams/Detail/BaseInfo'
import styles from './style'
import { ITeam } from 'contracts/team'

type IProps = WithStyles<typeof styles> & RouteComponentProps & {
    id: number | string
    load: (id: string | number) => Promise<void>,
    team: ITeam | null
}

type IState = {
    tabIndex: number,
    team: ITeam | null
}

class TeamDetail extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            tabIndex: 0,
            team: null
        }
    }

    componentDidMount() {
        this.props.load(this.props.id)
            .then(() => {
                this.setState({
                    team: this.props.team
                })
            })
    }

    render() {
        const {
            classes
        } = this.props
        const {
            tabIndex,
            team
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
                                <Tab label="團隊成員" />
                                <Tab label="任務列表" />
                            </Tabs>

                            <Divider />

                            <CardContent>
                                {(() => {
                                    return tabIndex === 0 ? <TeamBaseInfo  team={team} /> : ''
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