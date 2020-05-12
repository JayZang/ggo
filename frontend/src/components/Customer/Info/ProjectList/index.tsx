import React, { Component } from 'react'
import { Card, CardHeader, Table, TableContainer, TableHead, TableRow, TableCell, Divider, TablePagination, TableBody, Select, MenuItem, Typography, Tooltip, Box } from '@material-ui/core'
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import ArrowRightOutlinedIcon from '@material-ui/icons/ArrowRightOutlined';
import { Skeleton } from '@material-ui/lab'

import { IProject } from 'contracts/project';

enum SelectionType {
    All = 0,
    Completed = 1,
    NonCompleted = 2
}

type IProps = {
    projects: IProject[] | null
}

type IState = {
    page: number
    rowsPerPage: number
    selection: SelectionType
}


class CustomerProjectList extends Component<IProps, IState> {
    state = {
        page: 0,
        rowsPerPage: 5,
        selection: SelectionType.All
    }

    get projects() {
        const { projects } = this.props
        const { selection } = this.state
        return projects && (selection === SelectionType.All ? projects : projects.filter(project => {
            if (selection === SelectionType.Completed)
                return !!project.finish_datetime
            else if (selection === SelectionType.NonCompleted)
                return !project.finish_datetime
            return false
        }))
    }

    render() {
        const projects = this.projects
        const {
            page,
            rowsPerPage,
            selection
        } = this.state

        return (
            <Card>
                <CardHeader
                    title={`專案列表`}
                    classes={{
                        action: 'm-0 align-self-center'
                    }}
                    action={(
                        <Select
                            variant="outlined"
                            value={selection}
                            inputProps={{
                                className: 'py-1'
                            }}
                            onChange={event => this.setState({ selection: event.target.value as SelectionType })}
                        >
                            <MenuItem value={SelectionType.All}>全部</MenuItem>
                            <MenuItem value={SelectionType.Completed}>已結案</MenuItem>
                            <MenuItem value={SelectionType.NonCompleted}>未結案</MenuItem>
                        </Select>
                    )}
                />
                <Divider />
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>專案名稱</TableCell>
                                <TableCell>專案期限</TableCell>
                                <TableCell>完成日期</TableCell>
                                <TableCell>預估比 
                                    <Tooltip title="完成日期 / 專案期限 X 100%">
                                        <Typography color="textSecondary" component="span">
                                            <ContactSupportIcon fontSize="small" />
                                        </Typography>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projects ? (projects.length ? projects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(project => (
                                <TableRow key={project.id}>
                                    <TableCell>
                                        {project.name}
                                    </TableCell>
                                    <TableCell>
                                        <Box className="d-flex align-items-center">
                                            <Typography>
                                                <TodayOutlinedIcon />
                                                {project.start_datetime.format('YYYY-MM-DD')}
                                            </Typography>
                                            <ArrowRightOutlinedIcon />
                                            <Typography>
                                                <TodayOutlinedIcon />
                                                {project.deadline_datetime.format('YYYY-MM-DD')}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {project.finish_datetime && project.finish_datetime.format('YYYY-MM-DD')}
                                    </TableCell>
                                    <TableCell>
                                        {(() => {
                                            if (!project.finish_datetime)
                                                return null

                                            const {
                                                start_datetime,
                                                deadline_datetime,
                                                finish_datetime
                                            } = project
                                            
                                            return `${(finish_datetime.diff(start_datetime) / deadline_datetime.diff(start_datetime) * 100).toFixed(2)}%`
                                        })()}
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={99}>無專案資訊</TableCell>
                                </TableRow>
                            )) : new Array(3).fill(0).map((value, index) => (
                                <TableRow key={index}>
                                    <TableCell colSpan={99}>
                                        <Skeleton height={30} width="60%" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {projects ? (
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={projects.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onChangePage={(event, page) => this.setState({ page })}
                        onChangeRowsPerPage={event => this.setState({ rowsPerPage: parseInt(event.target.value) })}
                        labelRowsPerPage="每頁筆數"
                        labelDisplayedRows={(pageInfo) => `第${pageInfo.page + 1}頁    ,   ${pageInfo.from}-${pageInfo.to}筆`}
                    />
                ) : null}
            </Card>
        )
    }
}

export default CustomerProjectList