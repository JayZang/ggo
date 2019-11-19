import React, { Component } from 'react'
import {
    ChevronLeft as BackIcon
} from '@material-ui/icons'

import TeamEditPanel from './index'
import RightDrawerContainer from 'components/RightDrawerContainer'
import MobileHeader from 'components/MobileHeader'

type IProps = {
    open: boolean,
    onOpen: () => void,
    onClose: () => void
}

class MemberEditDrawer extends Component<IProps> {
    render() {
        const {
            open,
            onOpen,
            onClose
        } = this.props

        return (
            <RightDrawerContainer
                open={open}
                onOpen={onOpen}
                onClose={onClose}
                headComponent={
                    <MobileHeader
                        title="新增團隊"
                        defaultHidden={true}
                        leftComponent={(
                            <BackIcon onClick={onClose} />
                        )}
                    />
                }
            >
                <TeamEditPanel 
                    onSubmitSuccess={onClose}
                />
            </RightDrawerContainer>
        )
    }
}

export default MemberEditDrawer