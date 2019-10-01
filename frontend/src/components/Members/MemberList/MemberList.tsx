import React, { Component } from 'react'

import MemberItem from './MemberItem'

interface IProps {
  fetchMembers: () => void,
  members: any[]
}

class MemberList extends Component<IProps> {
  componentDidMount() {
    this.props.fetchMembers()
  }

  render() {
    return (
      <div id="member-list" style={{ marginTop: '32px' }}>
        {this.props.members.map((value, key) => <MemberItem key={key} />)}
      </div>
    )
  }
}

export default MemberList