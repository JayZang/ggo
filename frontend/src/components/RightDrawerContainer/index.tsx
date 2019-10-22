import React, { Component } from 'react'
import { WithStyles, Theme, withStyles, createStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'

const styles = (theme: Theme) => createStyles({
  drawerRoot: {
    [theme.breakpoints.down('xs')]: {
      zIndex: `${theme.zIndex.appBar - 2}!important` as any,
    }
  },
  drawerPaper: {
    width: 'auto',
    minWidth: 500,
    padding: theme.spacing(2, 1),
    [theme.breakpoints.down('xs')]: {
      backgroundColor: '#fafafa',
      width: '100vw',
      minWidth: 'unset',
      padding: 0
    }
  },
  closeBtn: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  closeIcon: {
    marginRight: theme.spacing(1)
  },
  content: {
    marginTop:theme.spacing(2),
    padding: theme.spacing(0, 2)
  }
})

interface IProps extends WithStyles<typeof styles> {
  open: boolean,
  onOpen: () => void,
  onClose: () => void,
  headComponent?: any
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
        >
          {this.props.headComponent}

          <div>
            <Button className={classes.closeBtn} onClick={this.props.onClose}>
              <CloseIcon className={classes.closeIcon} />
              Close
            </Button>
          </div>

          <div className={classes.content}>
            {this.props.children}
          </div>
        </SwipeableDrawer>
      </div>
    )
  }

}

export default withStyles(styles)(RightDrawerContainer)