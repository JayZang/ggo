import React, { Component } from 'react'
import { 
    WithStyles, 
    withStyles, 
    Paper, 
    Avatar,
    Typography,
    Divider
} from '@material-ui/core'
import {
    Phone as PhoneIcon,
    MailOutline as MailOutlineIcon,
    Cake as CakeIcon,
    WorkOutlineOutlined as WorkOutlineOutlinedIcon,
    WorkOffOutlined as WorkOffOutlinedIcon,
    Wc as WcIcon
} from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'

import { IMember, MemberGender, MemberStatus } from 'contracts/member'
import styles from './styles'
import defaultManAvatar from 'assets/svgs/default-man-avatar.svg'
import defaultWomanAvatar from 'assets/svgs/default-woman-avatar.svg'

type IProps = WithStyles<typeof styles> & {
    member: IMember | null
}

class MemberBaseInfoCard extends Component<IProps> {
    render() {
        const {
            classes,
            member
        } = this.props

        return (
            <div className={classes.root}>
                {(function () {
                    if (!member)
                        return <Skeleton className={classes.avatar} variant="circle" />
                    
                    return <Avatar className={classes.avatar}
                        src={(() => {
                            if (!member.avatar) {
                                switch (member.gender) {
                                    case MemberGender.male:
                                        return defaultManAvatar
                                    case MemberGender.female:
                                        return defaultWomanAvatar
                                    case MemberGender.other:
                                        return defaultManAvatar
                                    default:
                                        return defaultManAvatar
                                }
                            } else {
                                return member.avatar
                            }
                        })()}
                    />
                })()}
               
                <Typography variant="h3" className={classes.memberName}>
                    { member && member.name || <Skeleton width={200} height={40} variant="rect" />}
                </Typography>
                <Paper className={classes.papper}>
                    <div className={classes.fieldsWrapper}>
                        <Typography className={classes.field} component="div">
                            <div className={classes.fieldTitle}>
                                <WcIcon />
                                <span className={classes.fieldName}>性別</span>
                            </div>
                            <div>
                                {(function () {
                                    if (!member)
                                        return (<Skeleton />)

                                    switch (member.gender) {
                                        case MemberGender.male:
                                            return (<span>男♂</span>)
                                        case MemberGender.female:
                                            return (<span>女♀</span>)
                                        case MemberGender.other:
                                            return (<span>其他⚥</span>)
                                        default:
                                            return
                                    }
                                })()}
                            </div>
                        </Typography>

                        <Typography className={classes.field} component="div">
                            <div className={classes.fieldTitle}>
                                <PhoneIcon />
                                <span className={classes.fieldName}>聯絡電話</span>
                            </div>
                            <div>{member && member.phone || <Skeleton />}</div>
                        </Typography>

                        <Typography className={classes.field} component="div">
                            <div className={classes.fieldTitle}>
                                <MailOutlineIcon />
                                <span className={classes.fieldName}>Email</span>
                            </div>
                            <div>{member && member.email || <Skeleton />}</div>
                        </Typography>

                        <Typography className={classes.field} component="div">
                            <div className={classes.fieldTitle}>
                                <CakeIcon />
                                <span className={classes.fieldName}>生日</span>
                            </div>
                            <div>{member && member.birthday.format('YYYY-MM-DD') || <Skeleton />}</div>
                        </Typography>

                        <Typography className={classes.field} component="div">
                            <div className={classes.fieldTitle}>
                                <WorkOutlineOutlinedIcon />
                                <span className={classes.fieldName}>到職日</span>
                            </div>
                            <div>{member && member.take_office_date.format('YYYY-MM-DD') || <Skeleton />}</div>
                        </Typography>

                        <Typography className={classes.field} component="div">
                            <div className={classes.fieldTitle}>
                                <WorkOffOutlinedIcon />
                                <span className={classes.fieldName}>離職日</span>
                            </div>
                            <div>
                                {(function () {
                                    if (!member)
                                        return <Skeleton />
                                    else if (!member.leave_office_date)
                                        return '無'
                                    else
                                        return member.leave_office_date.format('YYYY-MM-DD')
                                })()}
                            </div>
                        </Typography>
                    </div>
                    <Divider />
                    <div className={classes.bottomBar}>
                        {(function () {
                            if (!member) 
                                return <Skeleton width={150} style={{ marginLeft: 'auto' }}  />
                            switch (member.status) {
                                case MemberStatus.active:
                                    return <Typography className={`badge-success ${classes.statusBadge}`}>Active</Typography>
                                case MemberStatus.inactive:
                                    return <Typography className={`badge-warning ${classes.statusBadge}`}>Inactive</Typography>
                            }
                        })()}
                    </div>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(MemberBaseInfoCard)