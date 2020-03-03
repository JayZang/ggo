import React, { Component } from 'react'
import {
    ChevronLeft as BackIcon
} from '@material-ui/icons'

import UserEditPanel from './index'
import RightDrawerContainer from 'components/RightDrawerContainer'
import MobileHeader from 'components/MobileHeader'
import { IUser } from 'contracts/user'

type IProps = {
    open: boolean,
    onOpen: () => void,
    onClose: () => void,
    user: IUser | null
}

class UserEditDrawer extends Component<IProps> {
    render() {
        const {
            open,
            onOpen,
            onClose,
            user
        } = this.props

        return (
            <RightDrawerContainer
                open={open}
                onOpen={onOpen}
                onClose={onClose}
                headComponent={
                    <MobileHeader
                        title= "編輯使用者"
                        defaultHidden={true}
                        leftComponent={(
                            <BackIcon onClick={onClose} />
                        )}
                    />
                }
            >
                <UserEditPanel 
                    onSubmitSuccess={onClose}
                    user={user}
                />
            </RightDrawerContainer>
        )
    }
}

export default UserEditDrawer