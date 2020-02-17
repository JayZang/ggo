import React, { Component } from 'react'
import { Box, Divider, Typography } from '@material-ui/core'

import TeamMemberListItem from './MemberItem'
import { IMember } from 'contracts/member'

type IProps = {
    members: IMember[]
}

class TeamMemberList extends Component<IProps> {
    render() {
        const {
            members
        } = this.props

        return (
            <Box paddingTop={2}>
                {members.map((member, index) => index === 0 ?
                    <TeamMemberListItem member={member} key={member.id} /> :
                    <Box key={member.id}>
                        <Divider />
                        <TeamMemberListItem member={member}  />
                    </Box>        
                )}
                {(() => {
                    return members.length === 0 ? (
                        <Typography align="center">
                            尚無成員
                        </Typography>
                    ) : null
                })()}
            </Box>
        )
    }
}

export default TeamMemberList