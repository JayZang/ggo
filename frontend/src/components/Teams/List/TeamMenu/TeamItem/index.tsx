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
    Grid
} from '@material-ui/core'
import { 
    Group as GroupIcon,
    Assignment as TaskIcon
} from '@material-ui/icons';
import clsx from 'clsx'

import styles from './styles'
import { ITeam } from 'contracts/team'
import { MemberGender } from 'contracts/member'
import defaultManAvatar from 'assets/svgs/default-man-avatar.svg'
import defaultWomanAvatar from 'assets/svgs/default-woman-avatar.svg'

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

                    <div className={classes.leaderWrapper}>
                        {this.renderLeaderAvatar()}
                        <div className={classes.leaderInfoWrapper}>
                            <Typography variant="h6" className={classes.leaderName}>
                                <Link to={`/members/${team.leader.id}`}>
                                    {team.leader.name}
                                </Link>
                            </Typography>
                            <Typography className={classes.leaderEamil} >
                                {team.leader.email}
                            </Typography>
                        </div>
                    </div>
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

    renderLeaderAvatar() {
        const { team, classes } = this.props
        const leader = team.leader

        return <Avatar className={classes.leaderAvatar}  src={(() => {
            if (leader.avatar)
                return leader.avatar
            else {
                switch (leader.gender) {
                    case MemberGender.female:
                        return defaultWomanAvatar

                    case MemberGender.male:
                    default:
                        return defaultManAvatar
                }
            }
        })()} />
    }
}

export default withStyles(styles)(TeamItem)