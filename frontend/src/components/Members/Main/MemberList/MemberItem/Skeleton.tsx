import React, { Component } from 'react'
import { Skeleton } from '@material-ui/lab'
import {
    Paper
} from '@material-ui/core'

import styles from './styles'
import { WithStyles } from '@material-ui/styles'
import { withStyles } from '@material-ui/core'

type IProps = WithStyles<typeof styles>

class MemberItemSkeleton extends Component<IProps> {
    render () {
        const { classes } = this.props

        return (
            <div className={classes.memberItem}>
                <Paper
                    classes={{
                        root: classes.paper
                    }}
                >
                    <Skeleton width={40} height={40} variant="circle" />
                    <div style={{ width: '100%', marginLeft: '16px' }}>
                        <Skeleton height={20} width="50%" />
                        <Skeleton height={20} width="30%" />
                    </div>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(MemberItemSkeleton)