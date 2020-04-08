import React, { Component } from 'react'
import { WithStyles } from '@material-ui/styles'
import { Grid, withStyles, Card, CardContent, Tabs, Tab, Divider, Button, Box } from '@material-ui/core'

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import TeamTaskList from 'components/Teams/Detail/TaskList'
import TeamBaseInfo from 'components/Teams/Detail/BaseInfo'
import TeamLeaderCard from 'components/Teams/Detail/LeaderCard'
import TeamMemberList from 'components/Teams/Detail/MemberList'
import TeamEditDrawer from 'components/Teams/TeamEditPanel/TeamEditDrawer'
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
    tabIndex: number
    loaded: boolean
    openEditPanel: boolean
}

class TeamDetail extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            tabIndex: 0,
            loaded: false,
            openEditPanel: false
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
            loaded,
            openEditPanel
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
                            <Box display="flex" alignItems="center" pr={2}>
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
                                <Button 
                                    className="ml-auto" 
                                    size="small" 
                                    color="primary" 
                                    variant="contained"
                                    onClick={() => this.setState({ openEditPanel: true })}
                                    disabled={!loaded || !team}
                                >
                                    編輯
                                </Button>
                            </Box>

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

                    {loaded && team ? (
                        <TeamEditDrawer
                            team={team}
                            open={openEditPanel}
                            onOpen={() => this.setState({ openEditPanel: true })}
                            onClose={() => this.setState({ openEditPanel: false })}
                        />
                    ) : null}
                </Grid>
            </AppContent>
        )
    }
}

export default withStyles(styles)(TeamDetail)