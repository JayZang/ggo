import React, { Component } from 'react'

import MemberItem from './MemberItem'
import { IMember } from 'contracts/member'

interface IProps {
    fetchMembers: () => void,
    clearMembers: () => void,
    members: IMember[]
}

class MemberList extends Component<IProps> {
    componentDidMount() {
        this.props.fetchMembers()
    }

    componentWillUnmount() {
        this.props.clearMembers()
    }

    render() {
        return (
            <div style={{ marginTop: 30, position: 'relative' }}>
                {
                    this.props.members.map((m) => 
                        <MemberItem member={m} key={m.id} />
                    )
                }
            </div>
        )
    }
}

export default MemberList