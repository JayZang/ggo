import React, { Component } from 'react'
import { 
    Card,
    CardContent,
    Box,
    Grid
} from '@material-ui/core'
import {
    Skeleton
} from '@material-ui/lab'

import { ITeam } from 'contracts/team'
import TeamItem from './TeamItem'

type IProps = {
    teams: ITeam[] | null
    onTeamEdit?: (team: ITeam) => void
}

class TeamMenu extends Component<IProps> {
    render() {
        return (
            <Grid container spacing={3}>
                { this.renderLoading() }
                { this.renderTeams() }
            </Grid>
        )
    }

    renderTeams() {
        if (!this.props.teams) return null

        return this.props.teams.map(team => (
            <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }} key={team.id}>
                <TeamItem 
                    team={team}
                    onEditBtnClick={() => {
                        this.props.onTeamEdit && this.props.onTeamEdit(team)
                    }}
                />
            </Grid>
        ))
    }

    renderLoading() {
        if (this.props.teams) return null

        return this.renderLoadingItem()
    }

    renderLoadingItem() {
        return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card style={{ width: '100%' }}>
                    <CardContent>
                        <Skeleton animation="wave" height={30} />
                        <Skeleton animation="wave" height={20} width="50%" />
                        <div className="mt-4">
                            <Skeleton animation="wave" height={20} />
                            <Skeleton animation="wave" height={20} />
                            <Skeleton animation="wave" height={20} width="50%" />
                        </div>
                        <div className="d-flex mt-4">
                            <Skeleton animation="wave" variant="circle" height={50} width={50} />
                            <div className="flex-grow-1 ml-3">
                                <Skeleton animation="wave" height={30} />
                                <Skeleton animation="wave" height={20} width="50%" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}

export default TeamMenu