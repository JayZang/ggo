import React, { Component } from 'react'
import { Dialog, DialogTitle, DialogContent, Paper, Grid, Avatar, Typography, Box, DialogActions, Button, Slide } from '@material-ui/core'

import IAMUserAccountSettingPanel from 'components/IAM/User/AccountSettingPanel'
import { TransitionProps } from '@material-ui/core/transitions'
import { IMember } from 'contracts/member';
import { UserIdentityType } from 'contracts/user';

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type IProps = {
    member: IMember | null
    onClose: () => void
    register: (data: {
        account_id?: string
        identity_type: UserIdentityType
        identity_id: string | number
    }) => Promise<void>
}

type IState = {
    accountId: string
    isAccountIdDefault: boolean
    isAccountIdValid: boolean
}

class MemberRegisterUserDialog extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            accountId: props.member ? props.member.email : '',
            isAccountIdDefault: false,
            isAccountIdValid: false
        }
    }

    handleRegisterBtnClick() {
        const {
            accountId,
            isAccountIdDefault,
            isAccountIdValid,
        } = this.state
        const member = this.props.member

        if (!isAccountIdValid || !member) return

        this.props.register({
            account_id: isAccountIdDefault ? undefined : accountId,
            identity_type: UserIdentityType.member,
            identity_id: member.id
        })
    }

    render() {
        const {
            member,
            onClose
        } = this.props

        return (
            <Dialog
                open={!!member}
                onClose={onClose}
                TransitionComponent={Transition}
                fullWidth
            >
                <DialogTitle>使用者註冊</DialogTitle>
                <DialogContent>
                    {member && (
                        <Paper className="px-2 py-1 mb-2">
                            <Grid container alignItems="center">
                                <Avatar src={member.avatar} />
                                <Grid item className="ml-2">
                                    <Grid container direction="column">
                                        <Typography>{member.name}</Typography>
                                        <Typography variant="body2" component="div" >
                                            <Box color="text.hint">成員</Box>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    )}

                    <IAMUserAccountSettingPanel
                        defaultAccountID={member ? member.email : ''}
                        onChange={(value, isDefault, isValid) => this.setState({
                            accountId: value,
                            isAccountIdDefault: isDefault,
                            isAccountIdValid: isValid
                        })}
                    />

                </DialogContent>
                <DialogActions>
                    <Button color="default" onClick={onClose}>
                        取消
                        </Button>
                    <Button 
                        color="primary" 
                        onClick={this.handleRegisterBtnClick.bind(this)}
                        disabled={!this.state.isAccountIdValid}
                    >
                        註冊
                        </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default MemberRegisterUserDialog