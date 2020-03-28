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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import clsx from 'clsx';

import HeaderSearchBar from './SearchBar';
import HeaderMenuBtn from 'components/MenuDrawer/MenuBtn';
import styles from './styles';
import { appName } from 'utils/viewConfig'
import { Link } from 'react-router-dom';
import { IUser, UserIdentityType } from 'contracts/user';
import { Avatar, Paper, Box } from '@material-ui/core';

interface IProps extends WithStyles<typeof styles> { 
    user: IUser
    openLeftArea: boolean,
    logout: () => void
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
        const user = this.props.user
        let avatarComponent: JSX.Element = <AccountCircle />
        const account: string = user.account_id
        let name: string = ''

        if (user.identity_type === UserIdentityType.member)  {
            avatarComponent = <Avatar src={user.identity!.avatar} />
            name = user.identity!.name
        } else if (user.identity_type === UserIdentityType.admin) {
            name = '管理者帳號'
        }

        return (
            <Menu
                anchorEl={this.state.profileAnchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                id={this.menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(this.state.profileAnchorEl)}
                onClose={this.handleMenuClose}
            >
                <Paper className="p-3 m-3 mb-2" style={{ minWidth: 250 }}>
                    <Box className="d-flex align-items-center">
                        {avatarComponent}
                        <Box className="ml-2">
                            <Typography>{name}</Typography>
                            <Typography component="div">
                                <Box color="text.hint">{account}</Box>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
                <MenuItem onClick={() => this.props.logout()}>
                    <ExitToAppIcon className="mr-2" />
                    登出
                </MenuItem>
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
        const {
            classes
        } = this.props;

        return (
            <AppBar position="fixed" color="inherit" className={classes.root}>
                <Toolbar>
                    <div className={clsx({
                        [classes.leftArea]: true,
                        open: this.props.openLeftArea
                    })}>
                        <Typography className={classes.title} variant="h6" noWrap>
                            <Link to="/" >{appName}</Link>
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
                            {/* {user.identity_type === UserIdentityType.member ? (
                                <Avatar src={user.identity!.avatar} style={{ width: 32, height: 32 }} />
                            ) : (
                                
                            )} */}
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