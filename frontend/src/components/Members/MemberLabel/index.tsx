import React, { Component } from 'react'
import { Paper, Grid, Avatar, Typography, Box } from '@material-ui/core'
import { IMember } from 'contracts/member'

type IProps = {
    member: IMember
    hint: string
    wrapper?: React.ComponentType
}

export default class MemberLabel extends Component<IProps> {
    render() {
        const {
            member,
            hint,
            wrapper
        } = this.props

        const Wrapper = wrapper || Paper

        return (
            <Wrapper className="px-3 py-1">
                <Grid container alignItems="center" spacing={2}>
                    <Avatar src={member.avatar} />
                    <Grid item>
                        <Grid container direction="column">
                            <Typography component="div">
                                <Box fontWeight="bold">{member.name}</Box>
                            </Typography>
                            <Typography variant="body2" component="div">
                                <Box color="text.hint">{hint}</Box>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Wrapper>
        )
    }
}