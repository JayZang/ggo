import React, { Component } from 'react'
import { Box } from '@material-ui/core'

import MemberItem from './MemberItem'
import MemberRegisterUserDialog from './RegisterUserDialog'
import { IMember } from 'contracts/member'

type IProps = {
    members: IMember[]
    hasPermissionToRegisterUser: boolean
}

type IState = {
    memberToRegisterUser: IMember | null
}

class MemberList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            memberToRegisterUser: null
        }
    }

    render() {
        const {
            members,
            hasPermissionToRegisterUser
        } = this.props
        const {
            memberToRegisterUser
        } = this.state

        return (
            <Box>
                <Box>
                    {members.map(member => (
                        <MemberItem 
                            member={member} key={member.id} 
                            hasPermissionToRegisterUser={hasPermissionToRegisterUser}
                            onRegisterUserBtnClick={() => this.setState({ memberToRegisterUser: member })}
                        />
                    ))}
                </Box>

                {hasPermissionToRegisterUser ? (
                    <MemberRegisterUserDialog
                        member={memberToRegisterUser}
                        onClose={() => this.setState({ memberToRegisterUser: null })}
                    />
                ) : null}
            </Box>
        )
    }
}

export default MemberList