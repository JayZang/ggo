import React, { Component } from 'react';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TaskIcon from '@material-ui/icons/Assignment';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';

import './styles.css'
import MenuBtn from 'components/MenuDrawer/MenuBtn'

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'none',
    flexGrow: 1,
    width: '100vw',
    position: 'fixed',
    bottom: 0,
    zIndex: theme.zIndex.appBar - 1,
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    }
  },
  indicator: {
    top: 0,
    bottom: 'inherit'
  }
});

interface IProps extends WithStyles<typeof styles> {}

interface IStates {
  index: number
}

class MobileBottomBar extends Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      index: 0
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    this.setState({
      index: newValue
    })
  }

  render() {
    const classes = this.props.classes;

    return (
      <Paper square className={classes.root} id="mobile-bottom-bar">
        <Tabs
          value={this.state.index}
          onChange={this.handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          TabIndicatorProps={{
            className: classes.indicator
          }}
        >
          <Tab icon={<TaskIcon />} />
          <Tab icon={<NotificationsIcon />} />
          <Tab icon={<AccountCircle />} />
          <Tab icon={<MenuBtn />} />
        </Tabs>
      </Paper>
    );
  }
}

export default withStyles(styles)(MobileBottomBar);