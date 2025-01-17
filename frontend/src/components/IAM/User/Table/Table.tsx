import React, { Component } from 'react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Toolbar, Typography, Checkbox, Box, Switch, Button, Dialog, Tabs, Tab, Avatar, Tooltip, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { withSnackbar, WithSnackbarProps } from 'notistack';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Link } from 'react-router-dom'

import TransitionDownToUp from 'components/Transition/DownToUpSlideTransition'
import UserEditDrawer from 'components/IAM/User/EditPanel/EditDrawer'
import GroupTable from 'components/IAM/Group/Table'
import PolicyTable from 'components/IAM/Policy/Table'
import { IUser, UserIdentityType } from 'contracts/user'
import { IPolicy } from 'contracts/policy'

type ITableToolbarProps = {
    title: string
    numSelected: number
    onDelete: () => void
}

class TableToolbar extends Component<ITableToolbarProps> {
    constructor(props: ITableToolbarProps) {
        super(props)

        this.state = {
            isSubmitting: false
        }
    }

    handleDeleteBtnClick() {
        this.setState({ isSubmitting: true })
        this.props.onDelete()
    }

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
                    <Box marginLeft="auto" className="d-flex align-items-center">
                        <Typography>
                            {numSelected} 個項目已選擇
                        </Typography>
                        <Tooltip title="刪除">
                            <Button
                                className="ml-3 bg-danger text-white"
                                component="span"
                                startIcon={<DeleteIcon />}
                                variant="contained"
                                onClick={this.handleDeleteBtnClick.bind(this)}
                            >
                                刪除
                            </Button>
                        </Tooltip>
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
        
        user.policies && user.policies.forEach(_policy => {
            policies[_policy.id as any] = _policy
        })

        user.groups && user.groups.forEach(group => {
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
                TransitionComponent={TransitionDownToUp}
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
                        groups={user && user.groups ? user.groups : []}
                        selectable={false}
                        editable={false}
                    />
                ) : (
                    <PolicyTable 
                        policies={user && user.policies? user.policies : []}
                        selectable={false}
                    />
                ))}
            </Dialog>
        )
    }
}

class UserDeleteWarningDialog extends Component<{
    open: boolean
    onClose: () => void,
    onDelete: () => Promise<void>
}, {
    isSubmittung: boolean
}> {
    constructor(props: any) {
        super(props)

        this.state = {
            isSubmittung: false
        }
    }

    handleDelete() {
        this.setState({ isSubmittung: true })
        this.props.onDelete().finally(() => {
            this.props.onClose()
            this.setState({ isSubmittung: false })
        })
    }

    render() {
        const {
            open,
            onClose
        } = this.props
        const {
            isSubmittung
        } = this.state

        return (
            <Dialog
                open={open}
                onClose={onClose}
                TransitionComponent={TransitionDownToUp}
                fullWidth
            >
                <DialogTitle>
                    刪除使用者
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        刪除使用者不影響所屬身份之資料，刪除後對應之身份即無使用者所操作，確定要執行刪除動作嗎？
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color="default" variant="contained">
                        返回
                    </Button>
                    <Button 
                        onClick={this.handleDelete.bind(this)} 
                        className="bg-danger text-white" 
                        variant="contained"
                        disabled={isSubmittung}
                    >
                        刪除
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

class ResetUserPasswordDialog extends Component<{
    open: boolean
    onClose: () => void,
    onReset: () => Promise<void>
}, {
    isSubmittung: boolean
    isSubmitSuccess: boolean
}> {
    constructor(props: any) {
        super(props)

        this.handleClose = this.handleClose.bind(this)

        this.state = {
            isSubmittung: false,
            isSubmitSuccess: false
        }
    }

    handleDelete() {
        this.setState({ isSubmittung: true })
        this.props.onReset().then(() => {
            this.setState({ isSubmitSuccess: true })
        }).finally(() => {
            this.setState({ isSubmittung: false })
        })
    }

    handleClose() {
        this.props.onClose()
        this.setState({ 
            isSubmittung: false,
            isSubmitSuccess: false
        })
    }

    render() {
        const {
            open,
        } = this.props
        const {
            isSubmittung,
            isSubmitSuccess
        } = this.state

        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                TransitionComponent={TransitionDownToUp}
                fullWidth
            >
                <DialogTitle>
                    重設使用者密碼
                </DialogTitle>
                <DialogContent>
                    {isSubmitSuccess ? (
                        <Alert severity="success">
                            <AlertTitle>重設使用者密碼成功</AlertTitle>
                                請將下載之檔案交付給該名使用者，並避免洩漏以防盜用。
                        </Alert>
                    ) : (
                        <DialogContentText>
                            <b>系統將自行為使用者產生新密碼</b>，確定要執行重設密碼動作嗎？
                        </DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="default" variant="contained">
                        返回
                    </Button>
                    {isSubmitSuccess ? null : (
                        <Button
                            onClick={this.handleDelete.bind(this)}
                            color="primary"
                            variant="contained"
                            disabled={isSubmittung}
                        >
                            重設
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        )
    }
}

type IUserTableProps = WithSnackbarProps & { 
    title: string
    users: IUser[]
    selectable: boolean
    editableOnManager: boolean
    onChange?: (users: IUser[]) => void
    onUserLoginableChange: (id: string | number, loginable: boolean) => Promise<void>
    resetUserPassword: (id: string | number, name: string) => Promise<void>
    deleteUsers: (ids: string[] | number[]) => Promise<void>
}

type IUserTableState = {
    selectedUsers: IUser[]
    userToDisplayPolicies: IUser | null
    userToUpdate: IUser | null
    userToResetPassword: IUser | null
    openDeleteWarningDialog: boolean
}

class UserTable extends Component<IUserTableProps, IUserTableState> {
    constructor(props: IUserTableProps) {
        super(props)

        this.state = {
            selectedUsers: [],
            userToDisplayPolicies: null,
            userToUpdate: null,
            userToResetPassword: null,
            openDeleteWarningDialog: false
        }
    }

    isUserSelectable(user: IUser) {
        if (user.identity_type === UserIdentityType.manager && !this.props.editableOnManager)
            return false
        return true 
    }

    get selectableUsers() {
        return this.props.users.filter(user =>this.isUserSelectable(user))
    }

    handleSelectAllClick() {
        let selectedUsers = this.state.selectedUsers
        const selectableUser = this.selectableUsers
        if (selectedUsers.length !== selectableUser.length)
            selectedUsers = [
                ...selectableUser
            ]
        else
            selectedUsers = []

        this.setState({ selectedUsers })
        this.props.onChange && this.props.onChange(selectedUsers)
    }

    handleSelectOne(user: IUser) {
        // manager users are not selectable to delete
        if (!this.isUserSelectable(user))
            return

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

    handleResetPwdBtnClick(event: React.MouseEvent<HTMLButtonElement>, user: IUser) { 
        event.stopPropagation()
        this.setState({
            userToResetPassword: user
        })
    }

    handleEditUserBtnClick(event: React.MouseEvent<HTMLButtonElement>, user: IUser) { 
        event.stopPropagation()
        this.setState({
            userToUpdate: user
        })
    }

    async handleDeleteUsersBtnClick() {
        const users = this.state.selectedUsers

        if (users.length === 0) return

        return this.props.deleteUsers(
            users.map(user => user.id as any)
        ).then(() => {
            this.setState({ selectedUsers: [] })
            this.props.enqueueSnackbar(`刪除使用者成功！`, {
                variant: 'success'
            })
        }).catch(() => {
            this.props.enqueueSnackbar(`刪除使用者失敗！`, {
                variant: 'error'
            })
        })
    }

    async handleResetUserPassword() {
        const user = this.state.userToResetPassword

        if (!user) return

        await this.props.resetUserPassword(
            user.id, 
            user.identity ? user.identity.name : ''
        )
    }

    render() {
        const {
            title,
            users,
            selectable,
            editableOnManager
        } = this.props
        const {
            selectedUsers,
            userToDisplayPolicies,
            userToUpdate,
            userToResetPassword,
            openDeleteWarningDialog
        } = this.state

        return (
            <Paper>
                <TableContainer>
                    <TableToolbar
                        title={title}
                        numSelected={selectedUsers.length}
                        onDelete={() => this.setState({
                            openDeleteWarningDialog: true
                        })}
                    />
                    <Table>
                        <TableHead>
                            <TableRow>
                                {selectable ? (
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            indeterminate={selectedUsers.length > 0 && selectedUsers.length < this.selectableUsers.length}
                                            checked={this.selectableUsers.length > 0 && selectedUsers.length === this.selectableUsers.length}
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
                                                    disabled={user.identity_type === UserIdentityType.manager && !editableOnManager}
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
                                                    case UserIdentityType.manager:
                                                    case UserIdentityType.member:
                                                        let identityName = user.identity_type === UserIdentityType.manager ?
                                                            '管理者' : '成員'
                                                        return (
                                                            <Link to={`/members/${user.identity_id}`}>
                                                                <Tooltip title="檢視身份" placement="bottom-start">
                                                                    <Box className="d-flex align-items-center">
                                                                        <Avatar src={user.identity.avatar} className="mr-2" />
                                                                        <Typography component="div">
                                                                            {user.identity.name}
                                                                            <Box color="text.hint" style={{ fontSize: 14 }}>
                                                                                {identityName}
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
                                                disabled={user.identity_type === UserIdentityType.manager && !editableOnManager}
                                                checked={user.loginable}
                                                color="primary"
                                                edge='start'
                                                onClick={event => event.stopPropagation()}
                                                onChange={(event, checked) => this.props.onUserLoginableChange(user.id, checked)}
                                            />
                                        </TableCell>

                                        <TableCell align="right" size="small">
                                            {user.identity_type === UserIdentityType.manager && !editableOnManager ? null : (
                                                <Box>
                                                    {/* manager has all permission, don't display */}
                                                    {user.identity_type === UserIdentityType.manager ? null : (
                                                        <Button
                                                            color="primary"
                                                            onClick={event => this.handleDisplayUserPoliciesBtnClick(event, user)}
                                                        >
                                                            查看權限
                                                        </Button>
                                                    )}

                                                    <Button
                                                        color="primary"
                                                        onClick={event => this.handleResetPwdBtnClick(event, user)}
                                                    >
                                                        密碼重設
                                                    </Button>

                                                    {/* manager has all permission, don't edit */}
                                                    {user.identity_type === UserIdentityType.manager ? null : (
                                                        <Button
                                                            color="primary"
                                                            onClick={event => this.handleEditUserBtnClick(event, user)}
                                                        >
                                                            權限編輯
                                                        </Button>
                                                    )}
                                                </Box>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <UserDeleteWarningDialog
                    open={openDeleteWarningDialog}
                    onClose={() => this.setState({
                        openDeleteWarningDialog: false
                    })}
                    onDelete={this.handleDeleteUsersBtnClick.bind(this)}
                />

                <UserPoliciesDialog 
                    user={userToDisplayPolicies}
                    onClose={() => this.setState({ userToDisplayPolicies: null })}
                />

                <ResetUserPasswordDialog 
                    open={!!userToResetPassword}
                    onClose={() => this.setState({ userToResetPassword: null })}
                    onReset={this.handleResetUserPassword.bind(this)}
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

export default withSnackbar(UserTable)