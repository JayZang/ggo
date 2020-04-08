import React, { Component } from 'react'
import { Box, Card, CardContent, Typography, Avatar } from '@material-ui/core'
import styled from 'styled-components'

import { IMember } from 'contracts/member'
import { Link } from 'react-router-dom'

type IProps = {
    className?: string,
    leader: IMember | null
}

 class TeamLeaderCard extends Component<IProps> {
    render() {
        const {
            className,
            leader
        } = this.props

        return (
            <Card className={className}>
                <CardContent>
                    <Link to={`/members/${leader ? leader.id : ''}`}>
                        <Avatar className="leader-avatar" src={leader ? leader.avatar : ''} />
                    </Link>
                    <Link to={`/members/${leader ? leader.id : ''}`}>
                        <Typography className="leader-name" variant="h5" align="center">
                            {leader && leader.name}
                        </Typography>
                    </Link>
                    <Typography className="leader-email" variant="body1" align="center">
                        {leader && leader.email}
                    </Typography>
                    <Typography className="mt-3" variant="body1" align="center" component="div">
                        <Box color="text.hint" fontWeight="bold">隊長資訊</Box>
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default styled(TeamLeaderCard)`
    width: 100%;

    & .leader-avatar {
        width: 200px;
        height: 200px;
        margin: 0 auto;
    }

    & .leader-name {
        font-weight: bold;
        margin-top: 16px;
    }
`