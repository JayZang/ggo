import React, { Component } from 'react'

import MemberItem from './MemberItem'
import { IMember } from 'contracts/member'

type IProps = {
    members: IMember[]
}

class MemberList extends Component<IProps> {
    render() {
        const members = this.props.members

        return (
            <div>
                {members.map((m) =>
                    <MemberItem member={m} key={m.id} />
                )}
            </div>
        )
    }
}

export default MemberList