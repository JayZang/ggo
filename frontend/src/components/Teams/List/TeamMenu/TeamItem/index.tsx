import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { 
    Card, 
    WithStyles, 
    withStyles, 
    CardContent, 
    Typography,
    Avatar,
    Divider,
    Grid,
    Tooltip
} from '@material-ui/core'
import { 
    Group as GroupIcon,
    Assignment as TaskIcon
} from '@material-ui/icons';
import clsx from 'clsx'

import styles from './styles'
import { ITeam } from 'contracts/team'

type IProps = WithStyles<typeof styles> & {
    team: ITeam
}

class TeamItem extends Component<IProps> {
    render() {
        const {
            classes,
            team
        } = this.props

        return (
            <Card className={clsx(
                classes.root, 
                classes.teamName)}
            >
                <CardContent className={classes.topCardContent}>
                    <Typography variant="h5" className={classes.teamName}>
                        {team.name}
                    </Typography>

                    <Typography className={classes.teamDescription}>
                        {team.description}
                    </Typography>

                    {team.leader && (
                        <Tooltip title="檢視隊長" placement="bottom-start">
                            <Link to={`/members/${team.leader.id}`} className={classes.leaderWrapper}>
                                <Avatar className={classes.leaderAvatar}  src={team.leader.avatar} />
                                <div className={classes.leaderInfoWrapper}>
                                    <Typography variant="h6" className={classes.leaderName}>
                                            {team.leader.name}
                                    </Typography>
                                    <Typography className={classes.leaderEamil} >
                                        {team.leader.email}
                                    </Typography>
                                </div>
                            </Link>
                        </Tooltip>
                    )}
                </CardContent>
                <Divider />
                <CardContent>
                    <Grid container justify="space-around">
                        <Grid item>
                            <div className={classes.countWrapper}>
                                <GroupIcon fontSize="large" />
                                <span className={classes.countNumber}>{team.members_count}</span>
                            </div>
                        </Grid>
                        <Grid item>
                            <div className={classes.countWrapper}>
                                <TaskIcon fontSize="large" />
                                <span className={classes.countNumber}>12</span>
                            </div>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
            </Card>
        )
    }
}

export default withStyles(styles)(TeamItem)