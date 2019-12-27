import React, { Component } from 'react'
import {
    ChevronLeft as BackIcon
} from '@material-ui/icons'

import RightDrawerContainer from 'components/RightDrawerContainer'
import MobileHeader from 'components/MobileHeader'
import TaskEditPanel from './index'

type IProp = {
    open: boolean,
    onOpen: () => void,
    onClose: () => void
}

export default class TaskEditDrawer extends Component<IProp> {
    render() {
        const {
            open,
            onOpen,
            onClose
        } = this.props

        return (
            <RightDrawerContainer
                title="新增工作任務"
                open={open}
                onOpen={onOpen}
                onClose={onClose}
                headComponent={
                    <MobileHeader
                        title="新增工作任務"
                        defaultHidden={true}
                        leftComponent={(
                            <BackIcon onClick={onClose} />
                        )}
                    />
                }
            >
                <TaskEditPanel
                    // project={project}
                    // onSubmitSuccess={onClose}
                />
            </RightDrawerContainer>
        )
    }
}