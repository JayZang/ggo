import React, { Component } from 'react'
import { AvatarGroup, AvatarGroupProps } from '@material-ui/lab'
import { IMember } from 'contracts/member'
import { Tooltip, Avatar } from '@material-ui/core'

type IProps = AvatarGroupProps & {
    members: IMember[]
}

class MemberAvatarList extends Component<IProps> {
    render() {
        const {
            members,
            ...props
        } = this.props
        
        return (
            <AvatarGroup max={7} {...props}>
                {members.map(member => (
                    <Tooltip title={member.name} placement="bottom" key={member.id}>
                        <Avatar className="bg-white" src={member.avatar} alt={member.name} />
                    </Tooltip>
                ))}    
            </AvatarGroup>
        )
    }
}

export default MemberAvatarList