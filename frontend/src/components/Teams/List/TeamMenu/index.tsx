import React, { Component } from 'react'
import { 
    withStyles,
    WithStyles,
    Card,
    CardContent,
    Box
} from '@material-ui/core'
import {
    Skeleton
} from '@material-ui/lab'

import styles from './styles'
import { ITeam } from 'contracts/team'
import TeamItem from './TeamItem'

type IProps = WithStyles<typeof styles> & {
    teams: ITeam[] | null
    onTeamEdit?: (team: ITeam) => void
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
            <Box className={this.props.classes.item} key={team.id}>
                <TeamItem 
                    team={team}
                    onEditBtnClick={() => {
                        this.props.onTeamEdit && this.props.onTeamEdit(team)
                    }}
                />
            </Box>
        ))
    }

    renderLoading() {
        if (this.props.teams) return null

        return this.renderLoadingItem()
    }

    renderLoadingItem() {
        return (
            <Box className={this.props.classes.item}>
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
            </Box>
        )
    }
}

export default withStyles(styles)(TeamMenu)