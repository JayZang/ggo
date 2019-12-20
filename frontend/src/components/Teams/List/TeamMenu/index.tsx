import React, { Component } from 'react'
import { 
    withStyles,
    WithStyles,
    Card,
    CardContent
} from '@material-ui/core'
import {
    Skeleton
} from '@material-ui/lab'

import styles from './styles'
import { ITeam } from 'contracts/team'
import TeamItem from './TeamItem'

type IProps = WithStyles<typeof styles> & {
    teams: ITeam[] | null
}

class TeamMenu extends Component<IProps> {
    render() {
        const {
            classes,
        } = this.props

        return (
            <div className={classes.root}>
                { this.renderLoading() }
                { this.renderTeams() }
            </div>
        )
    }

    renderTeams() {
        if (!this.props.teams) return null

        return this.props.teams.map(team => (
            <TeamItem team={team} key={team.id}/>
        ))
    }

    renderLoading() {
        if (this.props.teams) return null

        return this.renderLoadingItem()
    }

    renderLoadingItem() {
        return (
            <Card className={this.props.classes.item}>
                <CardContent>
                    <Skeleton height={10} />
                    <Skeleton height={10} width="50%" />
                    <div className="mt-4">
                        <Skeleton height={10} />
                        <Skeleton height={10} />
                        <Skeleton height={10} width="50%" />
                    </div>
                    <div className="d-flex mt-4">
                        <Skeleton variant="circle" height={50} width={50} />
                        <div className="flex-grow-1 ml-3">
                            <Skeleton height={10} />
                            <Skeleton height={10} width="50%" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(TeamMenu)