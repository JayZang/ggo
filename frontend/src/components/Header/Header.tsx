import React, { Component } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';

import HeaderSearchBar from './SearchBar';
import HeaderMenuBtn from 'components/MenuDrawer/MenuBtn';
import styles from './styles';

interface IProps extends WithStyles<typeof styles> { 
  openLeftArea: boolean
}

interface IStates {
  profileAnchorEl: null | HTMLElement,
  mobileMoreAnchorEl: null | HTMLElement
}

class Header extends Component<IProps, IStates> {
  menuId = 'primary-search-account-menu';
  mobileMenuId = 'primary-search-account-menu-mobile';

  constructor(props: IProps) {
    super(props);

    this.state = {
      profileAnchorEl: null,
      mobileMoreAnchorEl: null
    }

    this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this)
    this.handleMenuClose = this.handleMenuClose.bind(this)
    this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this)
    this.handleMobileMenuClose = this.handleMobileMenuClose.bind(this)
  }

  handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    this.setState({
      profileAnchorEl: event.currentTarget
    })
  }

  handleMenuClose() {
    this.setState({
      profileAnchorEl: null
    })
  }

  handleMobileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    this.setState({
      mobileMoreAnchorEl: event.currentTarget
    })
  }

  handleMobileMenuClose() {
    this.setState({
      mobileMoreAnchorEl: null
    })
  }

  renderMenu() {
    return (
      <Menu
        anchorEl={this.state.profileAnchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        id={this.menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(this.state.profileAnchorEl)}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );
  }

  renderMobileMenu() {
    return (
      <Menu
        anchorEl={this.state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={this.mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(this.state.mobileMoreAnchorEl)}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
  }

  render() {
    const classes = this.props.classes;

    return (
      <AppBar position="fixed" color="inherit" className={classes.root}>
        <Toolbar>
          <div className={clsx({
            [classes.leftArea]: true,
            open: this.props.openLeftArea
          })}>
            <Typography className={classes.title} variant="h6" noWrap>
              GGO Management
            </Typography>

            <HeaderMenuBtn />
          </div>

          <HeaderSearchBar />

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={this.menuId}
              aria-haspopup="true"
              onClick={this.handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={this.mobileMenuId}
              aria-haspopup="true"
              onClick={this.handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
        {this.renderMobileMenu()}
        {this.renderMenu()}
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);