import React, { Component } from 'react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Toolbar, Typography, Checkbox, Box, Switch, Button, Dialog, Slide, Tabs, Tab, Avatar, Tooltip } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'

import { IUser, UserIdentityType } from 'contracts/user'
import GroupTable from 'components/IAM/Group/Table'
import PolicyTable from 'components/IAM/Policy/Table'
import UserEditDrawer from 'components/IAM/User/EditPanel/EditDrawer'
import { IPolicy } from 'contracts/policy'
import { Link } from 'react-router-dom'

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

type IUserPoliciesDialogProps = {
    user: IUser | null,
    onClose: () => void
}

type IUserPoliciesDialogState = {
    tabIndex: number
}

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
    
class UserPoliciesDialog extends Component<IUserPoliciesDialogProps, IUserPoliciesDialogState> {
    constructor(props: IUserPoliciesDialogProps) {
        super(props)

        this.state = {
            tabIndex: 0
        }
    }

    integratePolicies() {
        const user = this.props.user

        if (!user) return []

        const policies: IPolicy[] = []
        
        user.policies.forEach(_policy => {
            policies[_policy.id as any] = _policy
        })

        user.groups.forEach(group => {
            group.policies.forEach(_policy => {
                if (policies[_policy.id as any]) return 
                policies[_policy.id as any] = _policy
            })
        })

        return policies
    }

    render() {
        const {
            user,
            onClose
        } = this.props
        const {
            tabIndex
        } = this.state

        return (
            <Dialog
                open={user !== null}
                onClose={onClose}
                TransitionComponent={Transition}
                fullWidth
            >
                <Typography  variant="h6" className="p-3 px-4">
                    {user && user.account_id} - 權限列表
                </Typography>
                <Tabs 
                    value={tabIndex} 
                    textColor="primary" 
                    indicatorColor="primary"
                    onChange={(event, value) => this.setState({ tabIndex: value })}
                >
                    <Tab  label="所有權限" />
                    <Tab  label="指派群組" />
                    <Tab  label="指派權限" />
                </Tabs>
                {tabIndex === 0 ? (
                    <PolicyTable 
                        policies={this.integratePolicies()}
                        selectable={false}
                    />
                ) : (tabIndex === 1 ? (
                    <GroupTable 
                        groups={user ? user.groups : []}
                        selectable={false}
                        editable={false}
                    />
                ) : (
                    <PolicyTable 
                        policies={user ? user.policies : []}
                        selectable={false}
                    />
                ))}
            </Dialog>
        )
    }
}

type IUserTableProps = {
    title: string
    users: IUser[]
    selectable: boolean
    onChange?: (users: IUser[]) => void
    onUserLoginableChange: (id: string | number, loginable: boolean) => Promise<void>
}

type IUserTableState = {
    selectedUsers: IUser[]
    userToDisplayPolicies: IUser | null
    userToUpdate: IUser | null
}

class UserTable extends Component<IUserTableProps, IUserTableState> {
    constructor(props: IUserTableProps) {
        super(props)

        this.state = {
            selectedUsers: [],
            userToDisplayPolicies: null,
            userToUpdate: null
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

    handleDisplayUserPoliciesBtnClick(event: React.MouseEvent<HTMLButtonElement>, user: IUser) {
        event.stopPropagation()
        this.setState({
            userToDisplayPolicies: user
        })
    }

    handleEditUserBtnClick(event: React.MouseEvent<HTMLButtonElement>, user: IUser) { 
        event.stopPropagation()
        this.setState({
            userToUpdate: user
        })
    }

    render() {
        const {
            title,
            users,
            selectable
        } = this.props
        const {
            selectedUsers,
            userToDisplayPolicies,
            userToUpdate
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
                                <TableCell>最後登錄時間</TableCell>
                                <TableCell align="center">可登入</TableCell>
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
                                        onClick={selectable ? () => this.handleSelectOne(user) : undefined}
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

                                        <TableCell>
                                            {user.account_id}
                                        </TableCell>

                                        <TableCell>
                                            {(() => {
                                                if (!user.identity) return null

                                                switch (user.identity_type) {
                                                    case UserIdentityType.member:
                                                        return (
                                                            <Link to={`/members/${user.identity_id}`}>
                                                                <Tooltip title="檢視身份" placement="bottom-start">
                                                                    <Box className="d-flex align-items-center">
                                                                        <Avatar src={user.identity.avatar} className="mr-2" />
                                                                        <Typography component="div">
                                                                            {user.identity.name}
                                                                            <Box color="text.hint" style={{ fontSize: 14 }}>
                                                                                成員
                                                                            </Box>
                                                                        </Typography>
                                                                    </Box>
                                                                </Tooltip>
                                                            </Link>
                                                        )

                                                    default:
                                                        return null
                                                }
                                            })()}
                                        </TableCell>

                                        <TableCell>
                                            {user.last_login_datetime ? user.last_login_datetime.format('YYYY-MM-DD HH:mm') : null}
                                        </TableCell>

                                        <TableCell align="center">
                                            <Switch
                                                checked={user.loginable}
                                                color="primary"
                                                edge='start'
                                                onClick={event => event.stopPropagation()}
                                                onChange={(event, checked) => this.props.onUserLoginableChange(user.id, checked)}
                                            />
                                        </TableCell>

                                        <TableCell align="right" size="small">
                                            <Button
                                                color="primary"
                                                onClick={event => this.handleDisplayUserPoliciesBtnClick(event, user)}
                                            >
                                                查看權限
                                            </Button>
                                            <Button
                                                color="primary"
                                                onClick={event => this.handleEditUserBtnClick(event, user)}
                                            >
                                                權限編輯
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <UserPoliciesDialog 
                    user={userToDisplayPolicies}
                    onClose={() => this.setState({ userToDisplayPolicies: null })}
                />

                <UserEditDrawer 
                    open={!!userToUpdate}
                    user={userToUpdate}
                    onOpen={() => {}}
                    onClose={() => this.setState({ userToUpdate: null })}
                />

            </Paper>
        )
    }
}

export default UserTable