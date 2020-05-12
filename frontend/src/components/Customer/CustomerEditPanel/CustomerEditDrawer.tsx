import React, { Component } from 'react'
import {
    ChevronLeft as BackIcon
} from '@material-ui/icons'

import RightDrawerContainer from 'components/RightDrawerContainer'
import MobileHeader from 'components/MobileHeader'
import CustomerEditPanel from './index'
import { ICustomer, IndustryCategory } from 'contracts/customer'

type IProps = {
    open: boolean,
    customer?: ICustomer | null
    onOpen: () => void,
    onClose: () => void
}

class CustomerEditDrawer extends Component<IProps> {
    render() {
        const {
            open,
            onOpen,
            onClose,
            customer
        } = this.props

        return (
            <RightDrawerContainer
                open={open}
                onOpen={onOpen}
                onClose={onClose}
                maxWidth={500}
                title={customer ? '編輯客戶' : '新增客戶'}
                headComponent={
                    <MobileHeader
                        title="新增客戶"
                        defaultHidden={true}
                        leftComponent={(
                            <BackIcon onClick={onClose} />
                        )}
                    />
                }
            >
                <CustomerEditPanel
                    customer={customer}
                    onSubmitSuccess={onClose}
                />
            </RightDrawerContainer>
        )
    }
}

export default CustomerEditDrawer