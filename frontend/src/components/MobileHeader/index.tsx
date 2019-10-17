import React, { Component } from 'react'
import { WithStyles, Theme, withStyles, createStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const styles = (theme: Theme) => createStyles({
    toolBar: {
        ...theme.mixins.toolbar,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderColor: theme.palette.grey[300],
        backgroundColor: theme.palette.common.white,
        padding: theme.spacing(0, 1.5),
        display: 'flex',
        alignItems: 'center'
    },
    toolBarDefaultHidden: {
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    leftComponent: {
        marginRight: theme.spacing(2),
        display: 'flex'
    }
})

interface IProps extends WithStyles<typeof styles> {
    title?: string
    leftComponent?: any
    defaultHidden: boolean
}

class MobileHeader extends Component<IProps> {
    render() {
        const classes = this.props.classes

        return (
            <div>
                <div className={clsx({
                    [classes.toolBar]: true,
                    [classes.toolBarDefaultHidden]: this.props.defaultHidden
                })}>
                    {this.props.leftComponent && (
                        <div className={classes.leftComponent}>
                            {this.props.leftComponent}
                        </div>
                    )}

                    <div>
                        <h1>{this.props.title}</h1>
                    </div>

                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(MobileHeader)