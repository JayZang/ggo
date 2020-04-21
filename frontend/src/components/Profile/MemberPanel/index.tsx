import React, { Component, ChangeEvent } from "react";
import { Box, Badge, Tooltip, Avatar, withStyles } from "@material-ui/core";
import { WithStyles } from '@material-ui/styles'
import {
    AccountBox as AccountBoxIcon,
    Edit as EditIcon
} from '@material-ui/icons'

import styles from './style'
import fileValidate from 'utils/fileValidate'
import { IMember } from "contracts/member";

type IProps = WithStyles<typeof styles> & {
    member: IMember | null
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
            classes
        } = this.props
        const {
            avatar
        } = this.state

        return (
            <Box>
                <Box textAlign="center">
                     <Badge
                            overlap="circle"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            badgeContent={
                                <Box component="span">
                                    <input type="file" id="avatar-img-input" className="d-none" onChange={this.handleAvatarChange.bind(this)} accept="image/*" />
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
                </Box>
            </Box>
        )
    }
}

export default withStyles(styles)(MemberProfilePanel) 