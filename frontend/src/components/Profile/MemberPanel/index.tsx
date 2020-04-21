import React, { Component, ChangeEvent } from "react";
import { Box, Badge, Tooltip, Avatar, withStyles, Typography, Divider, Paper, TextField } from "@material-ui/core";
import { WithStyles } from '@material-ui/styles'
import {
    AccountBox as AccountBoxIcon,
    Edit as EditIcon
} from '@material-ui/icons'

import styles from './style'
import fileValidate from 'utils/fileValidate'
import { IMember } from "contracts/member";

type IProps = WithStyles<typeof styles> & {
    member: IMember
}

type IState = {
    avatar: File | null
}

class MemberProfilePanel extends Component<IProps, IState> {
    state = {
        avatar: null
    }

    handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
        let avatar = null

        if (fileValidate(event.target, ['.jpg', '.jpeg', '.png']))
            avatar = event.target.files && event.target.files[0]

        this.setState({ avatar })
    }

    render() {
        const {
            classes,
            member
        } = this.props
        const {
            avatar
        } = this.state

        return (
            <Paper className="p-3">
                <Box textAlign="center">
                     <Badge
                            overlap="circle"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            badgeContent={
                                <Box component="span">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="d-none" 
                                        id="avatar-img-input" 
                                        onChange={this.handleAvatarChange.bind(this)} 
                                    />
                                    <Tooltip title="上傳圖檔">
                                        <label htmlFor="avatar-img-input">
                                            <Avatar className={classes.editAvatar}>
                                                <EditIcon />
                                            </Avatar>
                                        </label>
                                    </Tooltip>
                                </Box>
                            }
                        >
                            {avatar ? (
                                <Avatar className={classes.avatar} src={URL.createObjectURL(avatar)} />
                            ) :  (
                                <Avatar className={classes.avatar}>
                                    <AccountBoxIcon  className={classes.defaultAvatarImg} />
                                </Avatar>
                            )}
                        </Badge>
                        <Typography variant="h5" className="mt-3">
                            {member.name}
                        </Typography>
                </Box>
                <Divider className="my-4 mx-auto" style={{ maxWidth: 750 }} />
                <Box maxWidth={600} marginX="auto" padding={3} marginBottom={4}>
                    <TextField
                        label="Email"
                        defaultValue={member.email}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        className="mt-4"
                        label="聯絡電話"
                        defaultValue={member.phone}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        className="mt-4"
                        label="生日"
                        defaultValue={member.birthday.format('YYYY-MM-DD')}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        className="mt-4"
                        label="到職日"
                        defaultValue={member.take_office_date.format('YYYY-MM-DD')}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Box>
            </Paper>
        )
    }
}

export default withStyles(styles)(MemberProfilePanel) 