import React, { Component } from 'react'
import {
    ChevronLeft as BackIcon
} from '@material-ui/icons'

import GroupEditPanel from './index'
import RightDrawerContainer from 'components/RightDrawerContainer'
import MobileHeader from 'components/MobileHeader'
import { IGroup } from 'contracts/group'

type IProps = {
    open: boolean,
    onOpen: () => void,
    onClose: () => void,
    group?: IGroup
}

class GroupEditDrawer extends Component<IProps> {
    render() {
        const {
            open,
            onOpen,
            onClose,
            group
        } = this.props

        return (
            <RightDrawerContainer
                open={open}
                onOpen={onOpen}
                onClose={onClose}
                headComponent={
                    <MobileHeader
                        title={group ? "編輯群組" : "新增群組"}
                        defaultHidden={true}
                        leftComponent={(
                            <BackIcon onClick={onClose} />
                        )}
                    />
                }
            >
                <GroupEditPanel 
                    onSubmitSuccess={onClose}
                    group={group}
                />
            </RightDrawerContainer>
        )
    }
}

export default GroupEditDrawer