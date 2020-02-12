import React, { Component } from 'react'
import { Box, Card, CardContent, Typography, Avatar } from '@material-ui/core'
import styled from 'styled-components'

type IProps = {
    className?: string
}

 class TeamLeaderCard extends Component<IProps> {
    render() {
        const {
            className
        } = this.props

        return (
            <Card className={className}>
                <CardContent>
                    <Avatar className="leader-avatar" src={``} />
                    <Typography className="leader-name" variant="h5" align="center">
                        隊長名稱
                    </Typography>
                    <Typography className="leader-email" variant="body1" align="center">
                        mail@gmail.com
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