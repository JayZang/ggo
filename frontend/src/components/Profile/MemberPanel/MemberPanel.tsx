import React, { Component, ChangeEvent } from "react";
import { Box, Badge, Tooltip, Avatar, withStyles, Typography, Divider, Paper, TextField, InputAdornment, Button } from "@material-ui/core";
import { WithStyles } from '@material-ui/styles'
import {
    AccountBox as AccountBoxIcon,
    Edit as EditIcon
} from '@material-ui/icons'
import CakeIcon from '@material-ui/icons/Cake'
import PhoneIcon from '@material-ui/icons/Phone'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import WorkOutlineIcon from '@material-ui/icons/WorkOutline'
import { withSnackbar, WithSnackbarProps } from "notistack";

import styles from './style'
import fileValidate from 'utils/fileValidate'
import { IMember } from "contracts/member";

type IProps = WithStyles<typeof styles> & WithSnackbarProps & {
    member: IMember
    storeAvatar: (avatar: File) => Promise<void>
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

    handleStoreAvatar() {
        if (!this.state.avatar)
            return
        this.props.storeAvatar(this.state.avatar!)
            .then(() => {
                this.props.enqueueSnackbar('儲存頭貼成功！', {
                    variant: 'success'
                })
                this.setState({ avatar: null })
            }).catch(() => {
                this.props.enqueueSnackbar('儲存頭貼失敗！', {
                    variant: 'error'
                })
            })
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
            <Paper className="px-3 py-5">
                <Box textAlign="center" maxWidth={600} marginX="auto" position="relative">
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
                        ) : (member.avatar ? (
                            <Avatar className={classes.avatar} src={member.avatar} />
                        ) : (
                            <Avatar className={classes.avatar}>
                                <AccountBoxIcon  className={classes.defaultAvatarImg} />
                            </Avatar>
                        ))}
                    </Badge>
                    <Typography variant="h5" className="mt-3">
                        {member.name}
                    </Typography>

                    {avatar ? (
                        <Box position="absolute" right={0} bottom={0}>
                            <Button color="default" variant="outlined" onClick={this.handleStoreAvatar.bind(this)}>
                                儲存頭貼
                            </Button>
                        </Box>
                    ) : null}
                </Box>
                <Box maxWidth={600} marginX="auto" paddingY={3} marginBottom={0}>
                    <TextField
                        label="Email"
                        defaultValue={member.email}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MailOutlineIcon  color="disabled" />
                                </InputAdornment>
                              )
                        }}
                    />
                    <TextField
                        className="mt-4"
                        label="聯絡電話"
                        defaultValue={member.phone}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIcon color="disabled" />
                                </InputAdornment>
                              )
                        }}
                    />
                    <TextField
                        className="mt-4"
                        label="生日"
                        defaultValue={member.birthday.format('YYYY-MM-DD')}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CakeIcon color="disabled" />
                                </InputAdornment>
                              )
                        }}
                    />
                    <TextField
                        className="mt-4"
                        label="到職日"
                        defaultValue={member.take_office_date.format('YYYY-MM-DD')}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <WorkOutlineIcon color="disabled" />
                                </InputAdornment>
                              )
                        }}
                    />
                </Box>
            </Paper>
        )
    }
}

export default withStyles(styles)(
    withSnackbar(MemberProfilePanel)
) 