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
import EditIcon from '@material-ui/icons/Edit'
import { WithSnackbarProps, withSnackbar } from 'notistack'
import clsx from 'clsx'

import defaultManAvatar from 'assets/svgs/default-man-avatar.svg'
import defaultWomanAvatar from 'assets/svgs/default-woman-avatar.svg'
import { IMember, MemberStatus, MemberGender } from 'contracts/member'
import MemberEditDrawer from 'components/Members/MemberEditPanel/MemberEditDrawer'
import styles from './styles'

type IProps = WithStyles<typeof styles> & WithSnackbarProps & {
    member: IMember,
    handleDeleteMember: (id: number | string) => Promise<void>
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
    }

    handleOpenMenu(event: React.MouseEvent<HTMLElement>) {
        this.setState({
            menuAnchorEl: event.currentTarget
        })
    }

    handleCloseMenu() {
        this.setState({
            menuAnchorEl: null
        })
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

    hendleEditClicked() {
        this.setState({ isEditing: true })
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
        const member = this.props.member

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
                        <Avatar src={member.avatar || (member.gender ? defaultManAvatar : defaultWomanAvatar)} />
                        <Typography className={clsx(classes.field)} component="div">
                            {member.name}
                            <Box className={classes.fieldHint}>
                                Name
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
                            Gender
                        </Box>
                    </Typography>

                    <Typography className={clsx(classes.phone, classes.field)} component="div">
                        {member.phone}
                        <Box className={classes.fieldHint}>
                            Phone
                        </Box>
                    </Typography>

                    <Typography className={clsx(classes.email, classes.field)} component="div">
                        {member.email}
                        <Box className={classes.fieldHint}>
                            Email
                        </Box>
                    </Typography>

                    <Typography className={clsx(classes.birthday, classes.field)} component="div">
                        {member.birthday.format('YYYY-MM-DD')}
                        <Box className={classes.fieldHint}>
                            Birthday
                        </Box>
                    </Typography>

                    <Typography className={clsx(classes.birthday, classes.field)} component="div">
                        {(() => {
                            switch (member.status) {
                                case MemberStatus.active:
                                    return <span className="text-success">Active</span>
                                case MemberStatus.inactive:
                                    return <span className="text-warning">Inactive</span>
                                default:
                                    return 'Unknow'
                            }
                        })()}
                        <Box className={classes.fieldHint}>
                            Status
                        </Box>
                    </Typography>

                    <div>
                        <Link to={ `/members/${member.id}` }>
                            <Button
                                color="primary"
                                variant="outlined"
                                size="small"
                            >
                                View
                            </Button>
                        </Link>

                        <IconButton onClick={this.handleOpenMenu}>
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
                        >
                            <MenuItem onClick={this.handleDeleteClicked.bind(this)}>
                                <ListItemIcon className={classes.menuIcon}>
                                    <DeleteIcon />
                                </ListItemIcon>
                                <ListItemText primary="Delete" />
                            </MenuItem>
                            <MenuItem onClick={this.hendleEditClicked.bind(this)}>
                                <ListItemIcon className={classes.menuIcon}>
                                    <EditIcon />
                                </ListItemIcon>
                                <ListItemText primary="Edit" />
                            </MenuItem>
                        </Menu>
                    </div>
                </Paper>

                {this.renderEditMemberDrawer()}
            </div>
        )
    }
}

export default withSnackbar(
    withStyles(styles)(MemberItem)
)