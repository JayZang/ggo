import React, { Component } from 'react'
import { 
    WithStyles, 
    withStyles, 
    Paper, 
    Avatar,
    Typography 
} from '@material-ui/core'

import { IMember, MemberGender } from 'contracts/member'
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
                <Avatar className={classes.avatar} 
                    src={(() => {
                        if (!member)
                            return defaultManAvatar
                        else if (!member.avatar) {
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
                    })() } 
                />
                <Typography variant="h3" className={classes.memberName}>{member && member.name}</Typography>
                <Paper className={classes.papper}>
                    
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(MemberBaseInfoCard)