import React, { Component } from 'react'
import {
    withStyles,
    WithStyles,
    Grid,
    Paper,
    Tabs,
    Tab,
    Button,
    Box,
    Typography
} from '@material-ui/core'
import {
    Add as AddIcon
} from '@material-ui/icons'
import SwipeableViews from 'react-swipeable-views'

import styles from './styles'
import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import TeamMenu from 'components/Teams/List/TeamMenu'
import TeamEditDrawer from 'components/Teams/TeamEditPanel/TeamEditDrawer'
import { ITeam } from 'contracts/team'

type IProps = WithStyles<typeof styles> & {
    load: () => Promise<void>
    permanentTeams: ITeam[] | null,
    temporaryTeams: ITeam[] | null
}

type IState = {
    tabIndex: number
    openEditPanel: boolean
    teamToEdit: ITeam | null
}

class TeamList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.handleTeamEditEvent = this.handleTeamEditEvent.bind(this)
        this.state = {
            tabIndex: 0,
            openEditPanel: false,
            teamToEdit: null
        }
    }

    state = {
        tabIndex: 0,
        openEditPanel: false,
        teamToEdit: null
    }

    componentDidMount() {
        if (!this.props.permanentTeams || 
            !this.props.temporaryTeams)
            this.props.load()
    }

    handleTeamEditEvent(team: ITeam) {
        this.setState({
            teamToEdit: team,
            openEditPanel: true
        })
    }

    render() {
        const {
            classes,
            permanentTeams,
            temporaryTeams
        } = this.props
        const {
            tabIndex,
            openEditPanel,
            teamToEdit
        } = this.state

        return (
            <AppContent
                mobileHeader={(
                    <MobileHeader
                        title="團隊列表"
                        defaultHidden={false}
                    />
                )}
            >
                <Grid container className="align-items-center">
                    <Grid item>
                        <Typography variant="h5" component="div">
                            <Box fontWeight={500}>團隊管理</Box>
                        </Typography>
                    </Grid>
                    <Grid item className="ml-auto">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => this.setState({ openEditPanel: true })}
                        >
                            新增團隊
                        </Button>
                    </Grid>
                </Grid>

                <TeamEditDrawer
                    team={teamToEdit}
                    open={openEditPanel}
                    onOpen={() => this.setState({ openEditPanel: true })}
                    onClose={() => this.setState({ openEditPanel: false, teamToEdit: null })}
                />

                <Box className="mt-3">
                    {/* <Paper>
                        <Tabs
                            classes={{
                                root: classes.teamsTab
                            }}
                            value={tabIndex}
                            onChange={(event, newIndex) => this.setState({ tabIndex: newIndex })}
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="常駐團隊" />
                            <Tab label="臨時團隊" />
                        </Tabs>
                    </Paper> */}

                    {/* <SwipeableViews
                        axis="x"
                        disabled={true}
                        index={tabIndex}
                        onChangeIndex={newIndex => this.setState({ tabIndex: newIndex })}
                    > */}
                        <Box>
                            <TeamMenu 
                                teams={permanentTeams} 
                                onTeamEdit={this.handleTeamEditEvent}
                            />
                        </Box>
                        {/* <Box>
                            <TeamMenu 
                                teams={temporaryTeams} 
                                onTeamEdit={this.handleTeamEditEvent}
                            />
                        </Box>
                    </SwipeableViews> */}
                </Box>
            </AppContent>
        )
    }
}

export default withStyles(styles)(TeamList)