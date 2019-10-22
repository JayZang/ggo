import React, { Component } from 'react'

import MemberItem from './MemberItem'
import MemberItemSkeleton from './MemberItem/Skeleton'
import { IMember } from 'contracts/member'

type IProps = {
    fetchMembers: () => Promise<void>,
    clearMembers: () => void,
    members: IMember[]
}

type IState = {
    isFetched: boolean
}

class MemberList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            isFetched: false
        }
    }

    componentDidMount() {
        this.props.fetchMembers().then(() => {
            this.setState({ isFetched: true })
        })
    }

    componentWillUnmount() {
        this.props.clearMembers()
    }

    render() {
        const isFetched = this.state.isFetched
        const members = this.props.members

        return (
            <div style={{ marginTop: 30, position: 'relative' }}>
                {(function() {
                    if (!isFetched)
                        return (
                            <div>
                                <MemberItemSkeleton />
                                <MemberItemSkeleton />
                                <MemberItemSkeleton />
                                <MemberItemSkeleton />
                            </div>
                        )
                    else {
                        return members.map((m) =>
                            <MemberItem member={m} key={m.id} />
                        )
                    }
                })()}
            </div>
        )
    }
}

export default MemberList