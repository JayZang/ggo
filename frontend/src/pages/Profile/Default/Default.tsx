import React, { Component } from 'react'

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import MemberProfilePanel from 'components/Profile/MemberPanel'
import { IUser, UserIdentityType } from 'contracts/user'

type IProps = {
    user: IUser | null
}

class ProfileDefaultPage extends Component<IProps> {
    render() {
        const {
            user
        } = this.props

        return (
            <AppContent
                mobileHeader={(
                    <MobileHeader
                        title="我的資訊"
                        defaultHidden={false}
                    />
                )}
            >
                {user && [UserIdentityType.manager, UserIdentityType.member].includes(user.identity_type) ? (
                    <MemberProfilePanel member={user.identity!} />
                ) : null}
            </AppContent>
        )
    }
}

export default ProfileDefaultPage