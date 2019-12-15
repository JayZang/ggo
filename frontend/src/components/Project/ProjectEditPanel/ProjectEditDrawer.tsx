import React, { Component } from 'react'
import {
    ChevronLeft as BackIcon
} from '@material-ui/icons'

import RightDrawerContainer from 'components/RightDrawerContainer'
import MobileHeader from 'components/MobileHeader'
import CustomerEditPanel from './index'

type IProp = {
    open: boolean,
    onOpen: () => void,
    onClose: () => void
}

export default class ProjectEditDrawer extends Component<IProp> {
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
                        title="新增案件/專案"
                        defaultHidden={true}
                        leftComponent={(
                            <BackIcon onClick={onClose} />
                        )}
                    />
                }
            >
                <CustomerEditPanel
                    // onSubmitSuccess={onClose}
                />
            </RightDrawerContainer>
        )
    }
}