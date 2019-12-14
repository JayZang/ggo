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
import clsx from 'clsx';

import styles from './styles';
import TaskManagementListItem from './TaskManagementListItem'

interface IProps extends WithStyles<typeof styles> {
    open: boolean,
    toggleDrawer: () => void
}

function MenuDrawer(props: IProps) {
    const theme = useTheme();
    const useMobileDrawer = !useMediaQuery(theme.breakpoints.up('sm'));
    const {
        classes,
        open,
        toggleDrawer
    } = props;

    function handleMenuItemClick() {
        useMobileDrawer && toggleDrawer()
    }

    const drawer = (
        <div>
            <div className={props.classes.toolbar}>
                <Typography variant="h5" noWrap>
                    GGO Management
        </Typography>
            </div>
            <Divider />
            <List>
                <Link to="/members">
                    <ListItem button onClick={handleMenuItemClick}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="成員管理" />
                    </ListItem>
                </Link>
                <Link to="/teams">
                    <ListItem button onClick={handleMenuItemClick}>
                        <ListItemIcon>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText primary="團隊管理" />
                    </ListItem>
                </Link>
                <Link to="/customers">
                    <ListItem button onClick={handleMenuItemClick}>
                        <ListItemIcon>
                            <CustomerIcon />
                        </ListItemIcon>
                        <ListItemText primary="客戶管理" />
                    </ListItem>
                </Link>
                <Link to="/outsourcing">
                    <ListItem button onClick={handleMenuItemClick}>
                        <ListItemIcon>
                            <HomeWorkIcon />
                        </ListItemIcon>
                        <ListItemText primary="外包管理" />
                    </ListItem>
                </Link>

                <Divider />

                <ListItem button onClick={handleMenuItemClick}>
                    <ListItemIcon>
                        <MoneyIcon />
                    </ListItemIcon>
                    <ListItemText primary="財務管理" />
                </ListItem>
                <Link to="/projects">
                    <ListItem button onClick={handleMenuItemClick}>
                        <ListItemIcon>
                            <ProjectIcon />
                        </ListItemIcon>
                        <ListItemText primary="專案/案件管理" />
                    </ListItem>
                </Link>
                <TaskManagementListItem />

                <Divider />

                <ListItem button onClick={handleMenuItemClick}>
                    <ListItemIcon>
                        <GavelIcon />
                    </ListItemIcon>
                    <ListItemText primary="權限管理" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <nav className={classes.drawer}>
            <SwipeableDrawer
                classes={{
                    root: classes.root,
                    paper: clsx({
                        [classes.drawerPaper]: true,
                        open
                    }),
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