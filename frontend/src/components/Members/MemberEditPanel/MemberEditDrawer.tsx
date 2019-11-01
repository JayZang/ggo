import React, { Component } from 'react'
import {
    ChevronLeft as BackIcon
} from '@material-ui/icons'

import MemberEditPanel from './index'
import RightDrawerContainer from 'components/RightDrawerContainer'
import MobileHeader from 'components/MobileHeader'
import { IMember } from 'contracts/member'

type IProps = {
    open: boolean,
    onOpen: () => void,
    onClose: () => void,
    member?: IMember
}

class MemberEditDrawer extends Component<IProps> {
    render() {
        const {
            open,
            onOpen,
            onClose,
            member
        } = this.props

        return (
            <RightDrawerContainer
                open={open}
                onOpen={onOpen}
                onClose={onClose}
                headComponent={
                    <MobileHeader
                        title={member ? "編輯成員" : "新增成員"}
                        defaultHidden={true}
                        leftComponent={(
                            <BackIcon onClick={onClose} />
                        )}
                    />
                }
            >
                <MemberEditPanel 
                    onSubmitSuccess={onClose}
                    member={member}
                />
            </RightDrawerContainer>
        )
    }
}

export default MemberEditDrawer