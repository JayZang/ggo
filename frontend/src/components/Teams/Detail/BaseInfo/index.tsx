import React, { Component } from 'react'
import { Box, Typography, Grid, Divider } from '@material-ui/core'
import styled from 'styled-components'
import { ITeam } from 'contracts/team'

type IProps = {
    className?: string,
    team: ITeam | null
}

class TeamBaseInfo extends Component<IProps> {
    render() {
        const {
            className,
            team
        } = this.props

        return (
            <Box className={className}>
                <Typography className="team-name" variant="h5">
                    {team && team.name}
                </Typography>
                <Typography  className="team-description mt-2" variant="body1">
                    {team && team.description}
                </Typography>
                <Box className="status-bar mt-3">
                    <Grid container spacing={2} >
                        <Grid item xs={4} className="status-block">
                            <Typography variant="h6">狀態</Typography>
                            <Typography>{team && team.status_name}</Typography>
                        </Grid>
                        <Grid item xs={4} className="status-block">
                            <Typography variant="h6">創建時間</Typography>
                            <Typography>{team && team.create_at.format('YYYY-MM-DD HH:mm')}</Typography>
                        </Grid>
                        <Grid item xs={4} className="status-block">
                            <Typography variant="h6">臨時團隊</Typography>
                            <Typography>{team ? (team.is_temporary ? '是' : '否') : ''}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        )
    }
}

export default styled(TeamBaseInfo)`
    padding: 16px;

    & .team-name {
        font-weight: bold;
    }

    & .team-description {
        padding: 16px;
        border-left: 1px solid #e0e0e0;
        border-radius: 8px;
        background-color: rgba(0, 0, 0, 0.07);
        min-height: 100px;
        white-space: pre;
    }

    & .status-bar {
        border-color: #e0e0e0;
        border-style: solid;
        border-width: 1px;
        border-radius: 8px;
        overflow: hidden;

        & .status-block {
            padding: 24px;
            text-align: center;

            & + .status-block {
                border-left: 1px solid #e0e0e0;
            }
        }
    }
`