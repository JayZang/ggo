import React, { Component } from 'react'
import { Paper, Typography, Divider, Box, ListItem, List, ListItemText, ListItemIcon, ListItemAvatar, Avatar, IconButton, ListItemSecondaryAction, Menu, MenuItem, Select, Checkbox } from '@material-ui/core';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import SearchIcon from '@material-ui/icons/Search'

import WorkReportDialog from 'components/Dashboard/WorkReportDialog'
import { IWorkReport } from 'contracts/workReport';

type IProps = {
    workReports: IWorkReport[]
}

type IState = {
    workReportToDispaly: IWorkReport | null
}

class WorkReportList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            workReportToDispaly: null
        }
    }

    render() {
        const {
            workReports
        } = this.props
        const {
            workReportToDispaly
        } = this.state

        return (
            <Paper>
                <Box className="p-3 d-flex align-items-center">
                    <Typography variant="h6">
                        最新提交之工作報告
                    </Typography>
                    <Box marginLeft="auto"></Box>
                </Box>
                <Divider />
                <Box maxHeight={300} overflow="auto">
                    <List>
                        {workReports.map(workReport => (
                            <ListItem key={workReport.id}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <LibraryBooksIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={workReport.title}
                                    secondary={workReport.create_at.format('YYYY-MM-DD')}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" onClick={() => this.setState({
                                        workReportToDispaly: workReport
                                    })}>
                                        <SearchIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                        {workReports.length === 0 ? (
                            <ListItem>尚無最新提交之工作報告</ListItem>
                        ) : null}
                    </List>
                </Box>
                <WorkReportDialog 
                    workReport={workReportToDispaly}
                    onClose={() => this.setState({ workReportToDispaly: null })}
                />
            </Paper>
        )
    }
}

export default WorkReportList