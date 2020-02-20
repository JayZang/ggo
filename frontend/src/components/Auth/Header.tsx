import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, Theme, createStyles, WithStyles } from '@material-ui/core'

import { appName, symbolicColor } from 'utils/viewConfig'
import { withStyles } from '@material-ui/styles'

const styles = (theme: Theme) => createStyles({
    root: {
        boxShadow: theme.shadows[0],
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderColor: theme.palette.grey[300],
    }
})

type IProps = WithStyles<typeof styles>

class AuthHeader extends Component<IProps> {
    render() {
        const {
            classes
        } = this.props

        return (
            <AppBar position="relative" color="inherit" className={classes.root}>
                <Toolbar>
                    <Typography style={{ color: symbolicColor }} variant="h6" noWrap >
                        {appName}
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(AuthHeader)