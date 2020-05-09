import React, { Component } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogProps, DialogContentText } from '@material-ui/core'

import DownToUpSlideTransition from 'components/Transition/DownToUpSlideTransition'
import { ICustomer } from 'contracts/customer'

type IProps = {
    open: boolean
    onClose: () => void
    customer: ICustomer
    remove?: (id: string | number) => Promise<void>
}

export default class CustomerRemoveHintDialog extends Component<IProps> {
    handleRemove() {
        if (!this.props.remove)
            return

        this.props.remove(this.props.customer.id)
            .then(()=> {
                this.props.onClose()
            })
    }

    render() {
        const {
            open,
            onClose,
            customer
        } = this.props

        return (
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth
                maxWidth="sm"
                TransitionComponent={DownToUpSlideTransition}
            >
                <DialogTitle>刪除客戶</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        此操作將無法進行還原動作，確認要刪除嗎？ <br/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        返回
                    </Button>
                    <Button color="secondary" onClick={this.handleRemove.bind(this)}>
                        確認
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}