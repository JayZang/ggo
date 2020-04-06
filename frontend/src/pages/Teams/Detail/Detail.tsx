import React, { Component } from 'react'
import { WithStyles } from '@material-ui/styles'
import { Grid, withStyles, Card, CardContent, Tabs, Tab, Divider } from '@material-ui/core'

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import TeamTaskList from 'components/Teams/Detail/TaskList'
import TeamBaseInfo from 'components/Teams/Detail/BaseInfo'
import TeamLeaderCard from 'components/Teams/Detail/LeaderCard'
import TeamMemberList from 'components/Teams/Detail/MemberList'
import styles from './style'
import { ITask } from 'contracts/task'
import { ITeam } from 'contracts/team'

type IProps = WithStyles<typeof styles> & {
    id: number | string
    load: (id: string | number) => Promise<void>
    team: ITeam | null
    tasks: ITask[] | null,
    taskTotalCount: number,
    fetchTasks: (id: string | number) => Promise<void>
}

type IState = {
    tabIndex: number,
    loaded: boolean
}

class TeamDetail extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            tabIndex: 0,
            loaded: false
        }
    }

    componentDidMount() {
        this.props.load(this.props.id).then(() => {
            this.setState({
                loaded: true
            })
        })
    }

    render() {
        const {
            id,
            classes,
            team,
            tasks,
            taskTotalCount,
            fetchTasks
        } = this.props
        const {
            tabIndex,
            loaded
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
                <Grid container spacing={3} wrap="nowrap">
                    <Grid item className={classes.leftBlock}>
                        <TeamLeaderCard leader={(loaded && team && team.leader) ? team.leader : null} />
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
                                <Tab label={`團隊成員 (${loaded && team && team.members ? team.members.length : 0})`} />
                                <Tab label={`團隊任務 (${loaded ? taskTotalCount : 0})`} />
                            </Tabs>

                            <Divider />

                            <CardContent className={classes.contentWrapper}>
                                {(() => {
                                    return tabIndex === 0 ? <TeamBaseInfo  team={loaded ? team : null} /> : 
                                        (tabIndex === 1 ? <TeamMemberList members={loaded && team && team.members ? team.members : []} /> : 
                                        (tabIndex === 2 ? <TeamTaskList tasks={loaded && tasks ? tasks : []} totalCount={taskTotalCount} fetchTasks={fetchTasks.bind(this, id)} /> : ''))
                                })()}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </AppContent>
        )
    }
}

export default withStyles(styles)(TeamDetail)