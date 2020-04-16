import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { WithStyles, withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Box from '@material-ui/core/Box'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import DeleteIcon from '@material-ui/icons/Delete'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'
import EditIcon from '@material-ui/icons/Edit'
import { WithSnackbarProps, withSnackbar } from 'notistack'
import clsx from 'clsx'

import { IMember, MemberStatus, MemberGender } from 'contracts/member'
import MemberEditDrawer from 'components/Members/MemberEditPanel/MemberEditDrawer'
import styles from './styles'
import { green } from '@material-ui/core/colors'
import { Tooltip } from '@material-ui/core'

type IProps = WithStyles<typeof styles> & WithSnackbarProps & {
    member: IMember
    hasPermissionToRegisterUser: boolean
    handleDeleteMember: (id: number | string) => Promise<void>
    onStatusChangeBtnClick: (id: number | string, status: MemberStatus) => Promise<void>
    onRegisterUserBtnClick?: () => void
}

interface IState {
    menuAnchorEl: HTMLElement | null
    isDeleting: boolean
    isEditing: boolean
}

class MemberItem extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            menuAnchorEl: null,
            isDeleting: false,
            isEditing: false
        }

        this.handleOpenMenu = this.handleOpenMenu.bind(this)
        this.handleCloseMenu = this.handleCloseMenu.bind(this)
        this.handleEditClicked = this.handleEditClicked.bind(this)
        this.handleDeleteClicked = this.handleDeleteClicked.bind(this)
        this.handleStatusChangeBtnClick = this.handleStatusChangeBtnClick.bind(this)
    }

    handleOpenMenu(event: React.MouseEvent<HTMLElement>) {
        this.setState({ menuAnchorEl: event.currentTarget })
    }

    handleCloseMenu() {
        this.setState({ menuAnchorEl: null })
    }

    handleDeleteClicked() {
        this.setState({ isDeleting: true })
        this.handleCloseMenu()
        this.props.handleDeleteMember(
            this.props.member.id
        ).then(() => {
            this.setState({ isDeleting: false })
            this.props.enqueueSnackbar('刪除成員成功！',{
                variant: 'success'
            })
        }).catch(() => {
            this.setState({ isDeleting: false })
            this.props.enqueueSnackbar('刪除成員失敗！', {
                variant: 'error'
            })
        })
    }

    handleEditClicked() {
        this.setState({ isEditing: true })
        this.handleCloseMenu()
    }

    handleStatusChangeBtnClick() {
        const member = this.props.member
        this.props.onStatusChangeBtnClick(
            member.id, 
            member.status === MemberStatus.active ? 
                MemberStatus.inactive : 
                MemberStatus.active
        )
        this.handleCloseMenu()
    }

    renderEditMemberDrawer() {
        return (
            <MemberEditDrawer
                open={this.state.isEditing}
                onOpen={() => { this.setState({ isEditing: true }) }}
                onClose={() => { this.setState({ isEditing: false }) }}
                member={this.props.member}
            />
        )
    }

    render() {
        const classes = this.props.classes
        const {
            member,
            hasPermissionToRegisterUser
        } = this.props

        return (
            <div className={clsx(classes.memberItem, {
                [classes.isDeleting]: this.state.isDeleting
            })}>
                <Paper
                    classes={{
                        root: classes.paper
                    }}
                >
                    <div className={classes.name} style={{ display: 'flex' }}>
                        <Avatar src={member.avatar} />
                        <Typography className={clsx(classes.field)} component="div">
                            {member.name}
                            <Box className={classes.fieldHint}>
                                姓名
                            </Box>
                        </Typography>
                    </div>

                    <Typography className={clsx(classes.gender, classes.field)} component="div">
                        {
                            member.gender === MemberGender.male ? '男' :
                                member.gender === MemberGender.female ? '女' :
                                    member.gender === MemberGender.other ? '其他' : ''
                        }
                        <Box className={classes.fieldHint}>
                            性別
                        </Box>
                    </Typography>

                    <Typography className={clsx(classes.phone, classes.field)} component="div">
                        {member.phone}
                        <Box className={classes.fieldHint}>
                            聯絡電話
                        </Box>
                    </Typography>

                    <Typography className={clsx(classes.email, classes.field)} component="div">
                        {member.email}
                        <Box className={classes.fieldHint}>
                            電子郵件
                        </Box>
                    </Typography>

                    <Tooltip title={member.isUser ? '已註冊' : '未註冊'}>
                        <Box color={member.isUser ? green[400] : 'text.disabled'} textAlign="center">
                            <AccountCircleIcon />
                            <Box className={classes.fieldHint}>
                                使用者
                            </Box>
                        </Box>
                    </Tooltip>

                    {(() => {
                        let color = undefined
                        let hint = ''
                        switch (member.status) {
                            case MemberStatus.active:
                                color = green[400]
                                hint = '啟用'
                                break 
                            case MemberStatus.inactive:
                                color = 'warning.main'
                                hint = '停用'
                                break
                        }

                        return (
                            <Tooltip title={hint}>
                                <Box textAlign="center" color={color}>
                                    <EmojiObjectsIcon />
                                    <Box className={classes.fieldHint}>
                                        狀態
                                    </Box>
                                </Box>
                            </Tooltip>
                        )
                    })()}

                    <Box>
                        <Link to={ `/members/${member.id}` }>
                            <Button color="primary" size="small">
                                查看
                            </Button>
                        </Link>

                        <IconButton className="ml-1" onClick={this.handleOpenMenu}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={this.state.menuAnchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={!!this.state.menuAnchorEl}
                            onClose={this.handleCloseMenu}
                            MenuListProps={{
                                style: { minWidth: 115 }
                            }}
                        >
                            <MenuItem onClick={this.handleDeleteClicked}>
                                <ListItemIcon className={classes.menuIcon}>
                                    <DeleteIcon />
                                </ListItemIcon>
                                <ListItemText primary="刪除" />
                            </MenuItem>
                            <MenuItem onClick={this.handleEditClicked}>
                                <ListItemIcon className={classes.menuIcon}>
                                    <EditIcon />
                                </ListItemIcon>
                                <ListItemText primary="編輯" />
                            </MenuItem>
                            <MenuItem onClick={this.handleStatusChangeBtnClick}>
                                <ListItemIcon className={classes.menuIcon}>
                                    <EmojiObjectsIcon />
                                </ListItemIcon>
                                <ListItemText primary={member.status === MemberStatus.active ? '停用' : '啟用'} />
                            </MenuItem>
                            {member.isUser || !hasPermissionToRegisterUser ? null : (
                                <MenuItem onClick={() => {
                                    this.handleCloseMenu()
                                    this.props.onRegisterUserBtnClick && this.props.onRegisterUserBtnClick()
                                }}>
                                    <ListItemIcon className={classes.menuIcon}>
                                        <AssignmentIndIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="註冊使用者" />
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                </Paper>

                {this.renderEditMemberDrawer()}
            </div>
        )
    }
}

export default withSnackbar(
    withStyles(styles)(MemberItem)
)