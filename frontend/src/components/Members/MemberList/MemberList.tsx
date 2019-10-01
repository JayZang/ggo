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
      <div style={{ marginTop: 30 }}>
        {this.props.members.map((m, index) => <MemberItem member={m} key={index} />)}
      </div>
    )
  }
}

export default MemberList