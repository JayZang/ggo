import React, { Component } from 'react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Toolbar, Typography, Checkbox, Box, Switch, Button } from '@material-ui/core'
import { IUser } from 'contracts/user'

type ITableToolbarProps = {
    title: string
    numSelected: number
}

class TableToolbar extends Component<ITableToolbarProps> {
    render() {
        const {
            title,
            numSelected
        } = this.props

        return (
            <Toolbar>
                <Typography variant="h6">
                    {title}
                </Typography>
                {numSelected > 0 ? (
                    <Box marginLeft="auto">
                        <Typography>
                            {numSelected} 個項目已選擇
                        </Typography>
                    </Box>
                ) : null}
            </Toolbar>
        )
    }
}

type IUserTableProps = {
    title: string
    users: IUser[]
    selectable: boolean
    onChange?: (users: IUser[]) => void
}

type IUserTableState = {
    selectedUsers: IUser[]
}

class UserTable extends Component<IUserTableProps, IUserTableState> {
    constructor(props: IUserTableProps) {
        super(props)

        this.state = {
            selectedUsers: []
        }
    }

    handleSelectAllClick() {
        let selectedUsers = this.state.selectedUsers
        if (this.state.selectedUsers.length !== this.props.users.length)
            selectedUsers = [
                ...this.props.users
            ]
        else
            selectedUsers = []

        this.setState({ selectedUsers })
        this.props.onChange && this.props.onChange(selectedUsers)
    }

    handleSelectOne(user: IUser) {
        const selectedUsers = this.state.selectedUsers
        const index = selectedUsers.indexOf(user)

        if (index === -1)
            selectedUsers.push(user)
        else
            selectedUsers.splice(index, 1)

        this.setState({ selectedUsers })
        this.props.onChange && this.props.onChange(selectedUsers)
    }

    render() {
        const {
            title,
            users,
            selectable
        } = this.props
        const {
            selectedUsers
        } = this.state

        return (
            <Paper>
                <TableContainer>
                    <TableToolbar
                        title={title}
                        numSelected={selectedUsers.length}
                    />
                    <Table>
                        <TableHead>
                            <TableRow>
                                {selectable ? (
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            indeterminate={selectedUsers.length > 0 && selectedUsers.length < users.length}
                                            checked={users.length > 0 && selectedUsers.length === users.length}
                                            onClick={this.handleSelectAllClick.bind(this)}
                                        />
                                    </TableCell>
                                ) : null}
                                <TableCell>帳號</TableCell>
                                <TableCell>身份</TableCell>
                                <TableCell>可登入</TableCell>
                                <TableCell>最後登錄時間</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(user => {
                                const selected = selectedUsers.indexOf(user) !== -1

                                return (
                                    <TableRow
                                        hover
                                        key={user.id}
                                        onClick={selectable ? event => this.handleSelectOne(user) : undefined}
                                        selected={selectable ? selected : undefined}
                                    >
                                        {selectable ? (
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={selected}
                                                />
                                            </TableCell>
                                        ) : null}
                                        <TableCell>{user.account_id}</TableCell>
                                        <TableCell>{user.identity_id}</TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={user.loginable}
                                                color="primary"
                                                edge='start'
                                            />
                                        </TableCell>
                                        <TableCell>{user.last_login_datetime ? user.last_login_datetime.format('YYYY-MM-DD HH:mm') : null}</TableCell>
                                        <TableCell align="right">
                                            <Button
                                                color="primary"
                                                // onClick={event => this.handleDisplayGroupPoliciesBtnClick(event, group)}
                                            >
                                                查看權限
                                            </Button>
                                            <Button
                                                color="primary"
                                                // onClick={event => this.handleUpdateGroupBtnClick(event, group)}
                                            >
                                                編輯
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }
}

export default UserTable