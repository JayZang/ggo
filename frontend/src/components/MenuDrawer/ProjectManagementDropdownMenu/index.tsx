import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ProjectIcon from '@material-ui/icons/BusinessCenter';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    collapse: {
        borderLeft: `3px solid ${theme.palette.primary.main}99`,
        marginLeft: 26,
        marginBottom: theme.spacing(2),
        paddingLeft: 27
    }
});

interface IProps extends WithStyles<typeof styles>{};

interface IStates {
    open: boolean
}

class ProjectManagementDropdownMenu extends Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            open: false
        }

        this.handleClicked = this.handleClicked.bind(this)
    }

    handleClicked() {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        const open = this.state.open;

        return (
            <div>
                <ListItem button onClick={this.handleClicked}>
                    <ListItemIcon>
                        <Box color="primary.light">
                            <ProjectIcon />
                        </Box>
                    </ListItemIcon>
                    <ListItemText primary="專案/案件管理" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit className={this.props.classes.collapse}>
                    <List component="div" disablePadding>
                        <Link to="/projects">
                            <ListItem button>
                                <ListItemText primary="專案/案件" />
                            </ListItem>
                        </Link>
                        <Link to="/tasks">
                            <ListItem button>
                                <ListItemText primary="工作任務" />
                            </ListItem>
                        </Link>
                        <Link to="/work-reports">
                            <ListItem button>
                                <ListItemText primary="工作報告" />
                            </ListItem>
                        </Link>
                    </List>
                </Collapse>
            </div>
        )
    }
}

export default withStyles(styles)(ProjectManagementDropdownMenu);