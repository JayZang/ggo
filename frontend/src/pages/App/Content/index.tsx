import React, { Component } from 'react'
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles'

const styles = (theme: Theme) => createStyles({
    content: {
        padding: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1, 0),
            marginBottom: `calc(env(safe-area-inset-bottom) + 60px)`
        }
    }
})

type IProps = WithStyles<typeof styles> & {
    mobileHeader: any
}

class AppContent extends Component<IProps> {
    render() {
        const {
            classes,
            mobileHeader
        } = this.props

        return (
            <div>
                {mobileHeader}

                <div className={classes.content}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(AppContent)