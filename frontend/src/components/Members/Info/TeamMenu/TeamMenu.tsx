import React, { Component } from 'react'
import { Card, CardHeader, Divider, withStyles, CardContent, ListItem, Box, Typography, Button } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';
import { WithStyles } from '@material-ui/styles'

import styles from './styles'
import { ITeam } from 'contracts/team'
import { Link } from 'react-router-dom';

type IProps = WithStyles<typeof styles> & {
    memberId: number | string
    teams: ITeam[] | null
}

class TeamMenu extends Component<IProps> {
    render() {
        const {
            classes,
            teams,
            memberId
        } = this.props

        return (
            <Card>
                <CardHeader
                    classes={{
                        root: classes.cardHeaderRoot
                    }}
                    title="團隊"
                    titleTypographyProps={{
                        variant: "h6"
                    }}
                />

                <Divider />
                <CardContent classes={{
                    root: classes.cardContentRoot
                }}>
                    {(() => {
                        if (!teams) return (
                            <ListItem
                                disableGutters={true}
                                classes={{
                                    root: classes.cardItem
                                }}
                            >
                                <Box width="100%">
                                    <Skeleton height={12} />
                                    <Skeleton height={12} width={100} />
                                </Box>
                            </ListItem>
                        )
                        else if (teams.length === 0) return (
                            <ListItem
                                disableGutters={true}
                                classes={{
                                    root: classes.cardItem
                                }}
                            >
                                尚無加入團隊
                            </ListItem>
                        )
                        else return teams.map(team => (
                            <ListItem
                                key={team.id}
                                disableGutters={true}
                                classes={{
                                    root: classes.cardItem
                                }}
                            >
                                <Typography 
                                    variant="subtitle1" 
                                    component="div" 
                                    className={team.leader_id == memberId ? classes.leaderBar : classes.nonLeaderBar}
                                >
                                    {team.name} <Box fontSize={14} color="text.hint" component="span">/{team.leader_id == memberId ? '隊長' : '隊員'}</Box>
                                </Typography>
                                <Link to={`/teams/${team.id}`}>
                                    <Button variant="outlined" color="primary" size="small">查看</Button>
                                </Link>
                            </ListItem>
                        ))
                    })()}
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(TeamMenu)