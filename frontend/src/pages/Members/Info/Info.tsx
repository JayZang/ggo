import React, { Component } from 'react'

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import MemberBaseInfoCard from 'components/Members/Info/BaseInfoCard'

type IProps = {
    id: string | number
    loadMember: (id: string | number) => Promise<void>
}

class MemberInfo extends Component<IProps> {
    componentDidMount() {
        this.props.loadMember(
            this.props.id
        )
    }

    render() {
        return (
            <AppContent
                mobileHeader={(
                    <MobileHeader
                        title="Member Info"
                        defaultHidden={false}
                    />
                )}
            >
                <MemberBaseInfoCard></MemberBaseInfoCard>
            </AppContent>
        )
    }
}

export default MemberInfo