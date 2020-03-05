import React, { Component } from 'react'
import { Dialog, DialogTitle, DialogContent, Paper, Grid, Avatar, Typography, Box, DialogActions, Button, Slide } from '@material-ui/core'

import IAMUserAccountSettingPanel from 'components/IAM/User/AccountSettingPanel'
import { TransitionProps } from '@material-ui/core/transitions'
import { IMember } from 'contracts/member';

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type IProps = {
    member: IMember | null
    onClose: () => void
}

type IState = {
    accountId: string
}

class MemberRegisterUserDialog extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            accountId: props.member ? props.member.email : ''
        }
    }

    register() {

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
                        onChange={value => this.setState({
                            accountId: value
                        })}
                    />

                </DialogContent>
                <DialogActions>
                    <Button color="default" onClick={onClose}>
                        取消
                        </Button>
                    <Button color="primary" onClick={this.register.bind(this)}>
                        註冊
                        </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default MemberRegisterUserDialog