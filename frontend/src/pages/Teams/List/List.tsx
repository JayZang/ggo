import React, { Component } from 'react'
import {
    withStyles,
    WithStyles,
    Grid,
    Paper,
    Tabs,
    Tab,
    Button
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
    tabIndex: number,
    openEditPanel: boolean
}

class TeamList extends Component<IProps, IState> {
    state = {
        tabIndex: 0,
        openEditPanel: false
    }

    componentDidMount() {
        if (!this.props.permanentTeams || 
            !this.props.temporaryTeams)
            this.props.load()
    }

    render() {
        const {
            classes,
            permanentTeams,
            temporaryTeams
        } = this.props
        const {
            tabIndex,
            openEditPanel
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
                        <h3>團隊管理</h3>
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
                    open={openEditPanel}
                    onOpen={() => this.setState({ openEditPanel: true })}
                    onClose={() => this.setState({ openEditPanel: false })}
                />

                <div className="mt-4">
                    <Paper>
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
                    </Paper>

                    <SwipeableViews
                        className="mt-3"
                        axis="x"
                        index={tabIndex}
                        onChangeIndex={newIndex => this.setState({ tabIndex: newIndex })}
                    >
                        <div>
                            <TeamMenu teams={permanentTeams} />
                        </div>
                        <div>
                            <TeamMenu teams={temporaryTeams} />
                        </div>
                    </SwipeableViews>
                </div>
            </AppContent>
        )
    }
}

export default withStyles(styles)(TeamList)