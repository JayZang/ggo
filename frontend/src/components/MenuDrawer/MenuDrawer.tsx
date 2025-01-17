import React from 'react';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { useTheme, WithStyles, withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import CustomerIcon from '@material-ui/icons/AccountBox';
import GavelIcon from '@material-ui/icons/Gavel';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import MoneyIcon from '@material-ui/icons/LocalAtm';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TaskIcon from '@material-ui/icons/Assignment';
import ProjectIcon from '@material-ui/icons/BusinessCenter';
import clsx from 'clsx';

import styles from './styles';
import ProjectManagementDropdownMenu from './ProjectManagementDropdownMenu'
import { Permissions, IUser, UserIdentityType } from 'contracts/user';
import { Box } from '@material-ui/core';
import { appName } from 'utils/viewConfig';

interface IProps extends WithStyles<typeof styles> {
    user: IUser
    open: boolean
    toggleDrawer: () => void
    permissions: Permissions
    isIAMAvailable: boolean
}

function MenuDrawer(props: IProps) {
    const theme = useTheme();
    const useMobileDrawer = !useMediaQuery(theme.breakpoints.up('sm'));
    const {
        user,
        open,
        classes,
        toggleDrawer,
        permissions,
        isIAMAvailable
    } = props;

    function handleMenuItemClick() {
        useMobileDrawer && toggleDrawer()
    }

    const drawer = (
        <div>
            <div className={props.classes.toolbar}>
                <Typography variant="h5" noWrap>
                    {appName}
                </Typography>
            </div>
            <Divider />
            <List>
                <Link to="/dashboard">
                    <ListItem button onClick={handleMenuItemClick}>
                        <ListItemIcon>
                            <Box color="primary.light">
                                <DashboardIcon />
                            </Box>
                        </ListItemIcon>
                        <ListItemText primary="首頁" />
                    </ListItem>
                </Link>

                {[UserIdentityType.manager, UserIdentityType.member].includes(user.identity_type) ? (
                    <Box>
                        <Link to="/m/projects">
                            <ListItem button onClick={handleMenuItemClick}>
                                <ListItemIcon>
                                    <Box color="primary.light">
                                        <ProjectIcon />
                                    </Box>
                                </ListItemIcon>
                                <ListItemText primary="我管理的專案" />
                            </ListItem>
                        </Link>
                        <Link to="/m/tasks">
                            <ListItem button onClick={handleMenuItemClick}>
                                <ListItemIcon>
                                    <Box color="primary.light">
                                        <TaskIcon />
                                    </Box>
                                </ListItemIcon>
                                <ListItemText primary="我的任務" />
                            </ListItem>
                        </Link>
                    </Box>
                ) : null}

                {permissions.member_management || 
                permissions.team_management || 
                permissions.customer_management ? (
                    <Divider />
                ) : null}

                {permissions.member_management ? (
                    <Link to="/members">
                        <ListItem button onClick={handleMenuItemClick}>
                            <ListItemIcon>
                                <Box color="primary.light">
                                    <PersonIcon />
                                </Box>
                            </ListItemIcon>
                            <ListItemText primary="成員管理" />
                        </ListItem>
                    </Link>
                ) : null}
                
                {permissions.team_management ? (
                    <Link to="/teams">
                        <ListItem button onClick={handleMenuItemClick}>
                            <ListItemIcon>
                                <Box color="primary.light">
                                    <GroupIcon />
                                </Box>
                            </ListItemIcon>
                            <ListItemText primary="團隊管理" />
                        </ListItem>
                    </Link>
                ) : null}
                
                {permissions.customer_management ? (
                    <Link to="/customers">
                        <ListItem button onClick={handleMenuItemClick}>
                            <ListItemIcon>
                                <Box color="primary.light">
                                    <CustomerIcon />
                                </Box>
                            </ListItemIcon>
                            <ListItemText primary="客戶管理" />
                        </ListItem>
                    </Link>
                ) : null}

                {null && (
                    <Link to="/outsourcing">
                        <ListItem button onClick={handleMenuItemClick}>
                            <ListItemIcon>
                                <HomeWorkIcon />
                            </ListItemIcon>
                            <ListItemText primary="外包管理" />
                        </ListItem>
                    </Link>
                )}

                {null && (
                    <ListItem button onClick={handleMenuItemClick}>
                        <ListItemIcon>
                            <MoneyIcon />
                        </ListItemIcon>
                        <ListItemText primary="財務管理" />
                    </ListItem>
                )}

                {permissions.project_management ? (
                    <ProjectManagementDropdownMenu />
                ) : null}

                {isIAMAvailable ? (
                    <Box>
                        <Divider />
                        <Link to="/iam">
                            <ListItem button onClick={handleMenuItemClick}>
                                <ListItemIcon>
                                    <Box color="primary.light">
                                        <GavelIcon />
                                    </Box>
                                </ListItemIcon>
                                <ListItemText primary="使用者與權限" />
                            </ListItem>
                        </Link>
                    </Box>
                ) : null}
            </List>
        </div>
    );

    return (
        <nav className={classes.drawer}>
            <SwipeableDrawer
                classes={{
                    root: classes.root,
                    paper: clsx(classes.drawerPaper, { open }),
                }}
                variant={useMobileDrawer ? "temporary" : "persistent"}
                open={useMobileDrawer ? open : true}
                onOpen={toggleDrawer}
                onClose={toggleDrawer}
                disableBackdropTransition={true}
                disableDiscovery={true}
            >
                {drawer}
            </SwipeableDrawer>
        </nav>
    );
};

export default withStyles(styles)(MenuDrawer);