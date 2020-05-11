import React, { Component } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogProps, DialogContentText } from '@material-ui/core'

import DownToUpSlideTransition from 'components/Transition/DownToUpSlideTransition'
import { ICustomer } from 'contracts/customer'
import { WithSnackbarProps, withSnackbar } from 'notistack'

type IProps = WithSnackbarProps & {
    open: boolean
    onClose: () => void
    customer: ICustomer
    remove?: (id: string | number) => Promise<void>
}

class CustomerRemoveHintDialog extends Component<IProps> {
    handleRemove() {
        if (!this.props.remove)
            return

        this.props.remove(this.props.customer.id)
            .then(()=> {
                this.props.onClose()
                this.props.enqueueSnackbar(`刪除客戶 ${this.props.customer.company_name} 成功！`, {
                    variant: 'success'
                })
            })
            .catch(() => {
                this.props.enqueueSnackbar(`刪除客戶 ${this.props.customer.company_name} 失敗！`, {
                    variant: 'error'
                })
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
                        ( 若尚有專案來源來自此客戶，刪除將會失敗 )
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        返回
                    </Button>
                    <Button color="secondary" onClick={this.handleRemove.bind(this)}>
                        刪除
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withSnackbar(CustomerRemoveHintDialog)