import React, { Component } from 'react'
import { Dialog, DialogTitle, DialogContent, Box, DialogActions, Button, FormControlLabel, Checkbox } from '@material-ui/core'
import { WithSnackbarProps, withSnackbar } from 'notistack';
import { Alert, AlertTitle } from '@material-ui/lab';

import IAMUserAccountSettingPanel from 'components/IAM/User/AccountSettingPanel'
import TransitionDownToUp from 'components/Transition/DownToUpSlideTransition'
import MemberLabel from 'components/Members/MemberLabel'
import { UserIdentityType } from 'contracts/user';
import { IMember } from 'contracts/member';

type IProps = WithSnackbarProps & {
    member: IMember | null
    onClose: () => void
    register: (name: string, data: {
        account_id?: string
        identity_type: UserIdentityType
        identity_id: string | number
    }) => Promise<void>
}

type IState = {
    accountId: string
    isAccountIdDefault: boolean
    isAccountIdValid: boolean
    submitting: boolean
    isRegisterError: boolean
    isRegisterSuccess: boolean
    isManager: boolean
}

class MemberRegisterUserDialog extends Component<IProps, IState> {
    registerErrorHint = '該帳號已被其他使用者註冊！'

    constructor(props: IProps) {
        super(props)
        
        this.handleClose = this.handleClose.bind(this)

        this.state = {
            accountId: props.member ? props.member.email : '',
            isAccountIdDefault: false,
            isAccountIdValid: false,
            submitting: false,
            isRegisterError: false,
            isRegisterSuccess: false,
            isManager: false
        }
    }

    handleRegisterBtnClick() {
        const {
            accountId,
            isAccountIdDefault,
            isAccountIdValid,
            isManager
        } = this.state
        const member = this.props.member

        if (!isAccountIdValid || !member) return

        this.props.register(member.name, {
            account_id: isAccountIdDefault ? undefined : accountId,
            identity_type: isManager ? UserIdentityType.manager : UserIdentityType.member,
            identity_id: member.id
        }).then(() => {
            this.props.enqueueSnackbar('註冊使用者成功！', {
                variant: 'success'
            })
            this.setState({ isRegisterSuccess: true })
        }).catch(() => {
            this.props.enqueueSnackbar('註冊使用者失敗！', {
                variant: 'error'
            })
            this.setState({ isRegisterError: true })
        })
    }

    handleClose() {
        this.setState({
            isAccountIdDefault: false,
            isAccountIdValid: false,
            submitting: false,
            isRegisterError: false,
            isRegisterSuccess: false
        })
        this.props.onClose()
    }

    render() {
        const {
            member
        } = this.props
        const {
            isAccountIdValid,
            submitting,
            isRegisterError,
            isRegisterSuccess,
            isManager
        } = this.state

        return (
            <Dialog
                open={!!member}
                onClose={this.handleClose}
                TransitionComponent={TransitionDownToUp}
                fullWidth
                keepMounted={false}
            >
                <DialogTitle>使用者註冊</DialogTitle>
                <DialogContent>
                    {isRegisterSuccess ? (
                        <Box>
                            <Alert severity="success">
                                <AlertTitle>使用者註冊成功</AlertTitle>
                                請將下載之檔案交付給該名使用者，並避免洩漏以防盜用。
                            </Alert>
                        </Box>
                    ) : (
                        <Box>
                            {member && (
                                <MemberLabel 
                                    member={member}
                                    hint="成員"
                                />
                            )}

                            <IAMUserAccountSettingPanel
                                defaultAccountID={member ? member.email : ''}
                                defaultErrorMsg={isRegisterError ? this.registerErrorHint : undefined}
                                onChange={(value, isDefault, isValid) => this.setState({
                                    accountId: value,
                                    isAccountIdDefault: isDefault,
                                    isAccountIdValid: isValid,
                                    isRegisterError: false
                                })}
                            />

                            
                        </Box>
                    )}

                </DialogContent>
                <DialogActions>
                    {isRegisterSuccess ? null : (
                        <Box marginLeft="16px" marginRight="auto">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isManager}
                                        onChange={(event, checked) => this.setState({ isManager: checked })}
                                        color="primary"
                                    />
                                }
                                label="註冊為管理者"
                            />
                        </Box>
                    )}

                    <Button color="default" onClick={this.handleClose}>
                        {isRegisterSuccess ? '關閉' : '取消'}
                    </Button>
                    {isRegisterSuccess ? null : (
                        <Button
                            color="primary"
                            onClick={this.handleRegisterBtnClick.bind(this)}
                            disabled={!isAccountIdValid || submitting}
                        >
                            註冊
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        )
    }
}

export default withSnackbar(MemberRegisterUserDialog)