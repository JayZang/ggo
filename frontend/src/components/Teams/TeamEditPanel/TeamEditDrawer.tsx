import React, { Component } from 'react'
import {
    ChevronLeft as BackIcon
} from '@material-ui/icons'

import TeamEditPanel from './index'
import RightDrawerContainer from 'components/RightDrawerContainer'
import MobileHeader from 'components/MobileHeader'
import { ITeam } from 'contracts/team'

type IProps = {
    team?: ITeam | null
    open: boolean
    onOpen: () => void
    onClose: () => void
}

class MemberEditDrawer extends Component<IProps> {
    get isEditMode() {
        return !!this.props.team
    }
    
    render() {
        const {
            team,
            open,
            onOpen,
            onClose
        } = this.props

        const title = this.isEditMode ? '編輯團隊' : '新增團隊'

        return (
            <RightDrawerContainer
                open={open}
                onOpen={onOpen}
                onClose={onClose}
                headComponent={
                    <MobileHeader
                        title={title}
                        defaultHidden={true}
                        leftComponent={(
                            <BackIcon onClick={onClose} />
                        )}
                    />
                }
            >
                <TeamEditPanel 
                    team={team}
                    onSubmitSuccess={onClose}
                />
            </RightDrawerContainer>
        )
    }
}

export default MemberEditDrawer