import React, { Component } from 'react'
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import { Box, Zoom, Fab } from '@material-ui/core'
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';

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

type IState = {
    displayScrollToTopButtom: boolean
}

class AppContent extends Component<IProps, IState> {
    scrollElementRef = React.createRef<HTMLDivElement>()

    state = {
        displayScrollToTopButtom: false
    }

    handleScroll(event: React.UIEvent<HTMLDivElement>) {
        let scrollToTop = false

        if (event.currentTarget!.scrollTop > event.currentTarget!.clientHeight / 2)
            scrollToTop = true
        else
            scrollToTop = false

        if (this.state.displayScrollToTopButtom !== scrollToTop)
            this.setState({ displayScrollToTopButtom: scrollToTop })
    }

    scrollToTop() {
        this.scrollElementRef.current!.scrollTo(0, 0)
    }

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
                    elementRef={this.scrollElementRef}
                    symbol={pageSymbol}
                    onScrollBottom={onScrollBottom}
                    className={classes.content}
                    onScroll={this.handleScroll.bind(this)}
                >
                    {this.props.children}
                </RestorableScrollElement>

                <Zoom
                    in={this.state.displayScrollToTopButtom}
                    unmountOnExit
                >
                    <Box position="fixed" right={20} bottom={16}>
                        <Fab color="primary" size="small" onClick={this.scrollToTop.bind(this)}>
                            <VerticalAlignTopIcon />
                        </Fab>
                    </Box>
                </Zoom>
            </Box>
        )
    }
}

export default withStyles(styles)(AppContent)