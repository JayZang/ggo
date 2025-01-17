import React, { Component } from 'react'
import { WithStyles, Theme, withStyles, createStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import { Typography, Box, Grid } from '@material-ui/core'

const styles = (theme: Theme) => createStyles({
    drawerRoot: {
        [theme.breakpoints.down('xs')]: {
            zIndex: `${theme.zIndex.appBar - 2}!important` as any,
        }
    },
    drawerPaper: {
        width: 'auto',
        minWidth: 500,
        padding: theme.spacing(0, 1, 2),
        [theme.breakpoints.down('xs')]: {
            backgroundColor: '#fafafa',
            width: '100vw',
            minWidth: 'unset',
            padding: 0
        }
    },
    drawerTitleContainer: {
        position: 'sticky',
        zIndex: 2,
        top: 0,
        padding: theme.spacing(2, 0, 1),
        backgroundColor: theme.palette.common.white
    },
    closeBtn: {
        marginRight: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    content: {
        marginTop:theme.spacing(2),
        padding: theme.spacing(0, 2)
    }
})

interface IProps extends WithStyles<typeof styles> {
    title?: string
    open: boolean,
    onOpen: () => void,
    onClose: () => void,
    headComponent?: JSX.Element
    maxWidth?: number
}

class RightDrawerContainer extends Component<IProps> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            isOpenDrawer: false
        }
    }

    render() {
        const classes = this.props.classes

        return (
            <div>
                <SwipeableDrawer
                    anchor="right"
                    open={this.props.open}
                    onOpen={this.props.onOpen}
                    onClose={this.props.onClose}
                    classes={{
                        root: classes.drawerRoot,
                        paper: classes.drawerPaper
                    }}
                    PaperProps={{
                        style: {
                            maxWidth: this.props.maxWidth
                        }
                    }}
                >
                    {this.props.headComponent}

                    <Grid alignItems="center"  container className={classes.drawerTitleContainer}>
                        <Button className={classes.closeBtn} onClick={this.props.onClose}>
                            <CloseIcon />
                        </Button>
                        <Typography variant="h5">
                            {this.props.title}
                        </Typography>
                    </Grid>

                    <div className={classes.content}>
                        {this.props.children}
                    </div>
                </SwipeableDrawer>
            </div>
        )
    }
}

export default withStyles(styles)(RightDrawerContainer)