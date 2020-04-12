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
import ProjectIcon from '@material-ui/icons/BusinessCenter';
import GavelIcon from '@material-ui/icons/Gavel';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import MoneyIcon from '@material-ui/icons/LocalAtm';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TaskIcon from '@material-ui/icons/Assignment';
import clsx from 'clsx';

import styles from './styles';
import TaskManagementListItem from './TaskManagementListItem'
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
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="首頁" />
                    </ListItem>
                </Link>

                {user.identity_type === UserIdentityType.member ? (
                    <Link to="/m/tasks">
                        <ListItem button onClick={handleMenuItemClick}>
                            <ListItemIcon>
                                <TaskIcon />
                            </ListItemIcon>
                            <ListItemText primary="我的任務" />
                        </ListItem>
                    </Link>
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
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="成員管理" />
                        </ListItem>
                    </Link>
                ) : null}
                
                {permissions.team_management ? (
                    <Link to="/teams">
                        <ListItem button onClick={handleMenuItemClick}>
                            <ListItemIcon>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary="團隊管理" />
                        </ListItem>
                    </Link>
                ) : null}
                
                {permissions.customer_management ? (
                    <Link to="/customers">
                        <ListItem button onClick={handleMenuItemClick}>
                            <ListItemIcon>
                                <CustomerIcon />
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

                {permissions.project_management ? (
                    <Divider />
                ) : null}

                {null && (
                    <ListItem button onClick={handleMenuItemClick}>
                        <ListItemIcon>
                            <MoneyIcon />
                        </ListItemIcon>
                        <ListItemText primary="財務管理" />
                    </ListItem>
                )}

                {permissions.project_management ? (
                    <Link to="/projects">
                        <ListItem button onClick={handleMenuItemClick}>
                            <ListItemIcon>
                                <ProjectIcon />
                            </ListItemIcon>
                            <ListItemText primary="專案/案件管理" />
                        </ListItem>
                    </Link>
                ) : null}

                {permissions.project_management ? (
                    <TaskManagementListItem />
                ) : null}

                {isIAMAvailable ? (
                    <Box>
                        <Divider />
                        <Link to="/iam">
                            <ListItem button onClick={handleMenuItemClick}>
                                <ListItemIcon>
                                    <GavelIcon />
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