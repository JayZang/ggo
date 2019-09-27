import React, { Component } from 'react'
import { WithStyles, Theme, withStyles, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import FilterListIcon from '@material-ui/icons/FilterList'
import CloseIcon from '@material-ui/icons/Close'

const styles = (theme: Theme) => createStyles({
  toolBar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  filterIcon: {
    marginRight: theme.spacing(1)
  },
  drawerRoot: {
    [theme.breakpoints.down('xs')]: {
      zIndex: `${theme.zIndex.appBar - 1}!important` as any
    }
  },
  drawerPaper: {
    width: '100vw',
    padding: theme.spacing(2, 1),
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
      minWidth: 500
    }
  },
  drawerCloseIcon: {
    marginRight: theme.spacing(1)
  }
})

interface IProps extends WithStyles<typeof styles> {
  useFabBtn: boolean,
  className: string
}

interface IState {
  isOpenDrawer: boolean
}

class FilterBtn extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      isOpenDrawer: false
    }

    this.openDrawer = this.openDrawer.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
  }

  openDrawer() {
    this.setState({ isOpenDrawer: true })
  }

  closeDrawer() {
    this.setState({ isOpenDrawer: false })
  }

  render() {
    const classes = this.props.classes
    const className = this.props.className

    return (
      <div className={className}>
        {this.props.useFabBtn ? this.renderFabBtn() : this.renderNormalBtn()}

        <SwipeableDrawer
          anchor="right" 
          open={this.state.isOpenDrawer} 
          onOpen={this.openDrawer}
          onClose={this.closeDrawer}
          classes= {{
            root: classes.drawerRoot,
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolBar}></div>
          {this.renderFilterMenu()}
        </SwipeableDrawer>
      </div>
    )
  }

  renderNormalBtn() {
    const classes = this.props.classes

    return (
      <Button color="primary" onClick={this.openDrawer}>
        <FilterListIcon className={classes.filterIcon} />
        <span>
          Show Filter
          </span>
      </Button>
    )
  }

  renderFabBtn() {
    return (
      <Fab color="primary" onClick={this.openDrawer}>
        <FilterListIcon />
      </Fab>
    )
  }

  renderFilterMenu() {
    const classes = this.props.classes

    return (
      <div>
        <Button onClick={this.closeDrawer}>
          <CloseIcon className={classes.drawerCloseIcon} />
          Close
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(FilterBtn)