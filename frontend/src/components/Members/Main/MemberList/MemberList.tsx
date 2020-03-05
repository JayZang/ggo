import React, { Component } from 'react'
import { Box, Slide, Dialog, Paper, Button, DialogTitle, DialogContent, DialogActions, Grid, Avatar, Typography } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions';

import MemberItem from './MemberItem'
import IAMUserAccountSettingPanel from 'components/IAM/User/AccountSettingPanel'
import { IMember } from 'contracts/member'

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type IProps = {
    members: IMember[]
}

type IState = {
    memberToRegisterUser: IMember | null
}

class MemberList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            memberToRegisterUser: null
        }
    }

    render() {
        const members = this.props.members
        const {
            memberToRegisterUser
        } = this.state

        return (
            <Box>
                <Box>
                    {members.map(member => (
                        <MemberItem 
                            member={member} key={member.id} 
                            onRegisterUserBtnClick={() => this.setState({ memberToRegisterUser: member })}
                        />
                    ))}
                </Box>

                <Dialog
                    open={!!memberToRegisterUser}
                    onClose={() => this.setState({ memberToRegisterUser: null })}
                    TransitionComponent={Transition}
                    fullWidth
                >
                    <DialogTitle>使用者註冊</DialogTitle>
                    <DialogContent>
                        <IAMUserAccountSettingPanel 
                            defaultAccountID={memberToRegisterUser ? memberToRegisterUser.email : ''}
                        />
                        {memberToRegisterUser && (
                            <Paper className="px-2 py-1 mt-2">
                                <Grid container alignItems="center">
                                    <Avatar src={memberToRegisterUser.avatar} />
                                    <Grid item className="ml-2">
                                        <Grid container direction="column">
                                            <Typography>{memberToRegisterUser.name}</Typography>
                                            <Typography  variant="body2" component="div" >
                                                <Box color="text.hint">成員</Box>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button color="default" onClick={() => this.setState({ memberToRegisterUser: null })}>
                            取消
                        </Button>
                        <Button color="primary">
                            註冊
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        )
    }
}

export default MemberList