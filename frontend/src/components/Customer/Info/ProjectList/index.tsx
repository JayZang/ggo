import React, { Component } from 'react'
import { Card, CardHeader, Table, TableContainer, TableHead, TableRow, TableCell, Divider, TablePagination, TableBody, Select, MenuItem, Typography, Tooltip } from '@material-ui/core'
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
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
    selection: SelectionType
}


class CustomerProjectList extends Component<IProps, IState> {
    state = {
        selection: SelectionType.All
    }

    render() {
        const {
            projects
        } = this.props
        const {
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
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>專案名稱</TableCell>
                                <TableCell>起訖日期</TableCell>
                                <TableCell>完成日期</TableCell>
                                <TableCell>預估比 
                                    <Tooltip title="完成日期 / 起訖日期 X 100%">
                                        <Typography color="textSecondary" component="span">
                                            <ContactSupportIcon fontSize="small" />
                                        </Typography>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projects ? (
                                <TableRow></TableRow>
                            ) : new Array(3).fill(0).map((value, index) => (
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
                        count={12}
                        rowsPerPage={5}
                        page={0}
                        onChangePage={() => {}}
                        labelRowsPerPage="每頁筆數"
                    />
                ) : null}
            </Card>
        )
    }
}

export default CustomerProjectList