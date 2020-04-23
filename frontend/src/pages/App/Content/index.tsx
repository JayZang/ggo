import React, { Component } from 'react'
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

import RestorableScrollElement from 'components/RestorableScrollElement'

const styles = (theme: Theme) => createStyles({
    content: {
        flexGrow: 1,
        overflowY: 'auto',
        padding: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1, 0),
            marginBottom: `calc(env(safe-area-inset-bottom) + 60px)`
        }
    }
})

type IProps = WithStyles<typeof styles> & {
    mobileHeader: any
    pageSymbol?: Symbol
    onScrollBottom?: () => void
}

class AppContent extends Component<IProps> {
    render() {
        const {
            classes,
            onScrollBottom,
            pageSymbol,
            mobileHeader
        } = this.props

        return (
            <Box height="100vh" display="flex" flexDirection="column">
                {mobileHeader}

                <RestorableScrollElement 
                    symbol={pageSymbol}
                    onScrollBottom={onScrollBottom}
                    className={classes.content}
                >
                    {this.props.children}
                </RestorableScrollElement>
            </Box>
        )
    }
}

export default withStyles(styles)(AppContent)