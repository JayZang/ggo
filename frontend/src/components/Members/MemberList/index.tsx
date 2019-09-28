import React, { Component } from 'react'

import MemberItem from './MemberItem'

const members = [0, 1, 2,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

class MemberList extends Component {
  render() {
    return (
      <div id="member-list" style={{ marginTop: '32px' }}>
        {members.map((value, key) => <MemberItem key={key} />)}
      </div>
    )
  }
}

export default MemberList