import React, { Component } from 'react'
import { Theme, WithStyles, withStyles, createStyles } from '@material-ui/core/styles'
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
import clsx from 'clsx'

import defaultManAvatar from 'assets/svgs/default-man-avatar.svg'

const styles = (theme: Theme) => createStyles({
  memberItem: {
    marginBottom: theme.spacing(1.5),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: '.4s ease',
    '&:hover': {
      transform: 'scale(1.02)'
    }
  },
  field: {
    marginLeft: theme.spacing(3)
  },
  fieldHint: {
    fontSize: 14,
    color: theme.palette.text.hint,
    fontWeight: theme.typography.fontWeightMedium
  },
  name: {
    fontWeight: 'bold',
    maxWidth: 100,
    flexGrow: 1
  },
  gender: {
    maxWidth: 70,
    flexGrow: 1,
  },
  phone: {
    maxWidth: 100,
    flexGrow: 1,
  },
  email: {
    maxWidth: 160,
    flexGrow: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  birthday: {
    maxWidth: 110,
    flexGrow: 1,
  },
  menuIcon: {
    minWidth: 38,
    color: theme.palette.grey[600]
  }
})

interface IProps extends WithStyles<typeof styles> {}

interface IState {
  menuAnchorEl: HTMLElement | null
}

class MemberItem extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      menuAnchorEl: null
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

  render() {
    const classes = this.props.classes

    return (
      <div className={classes.memberItem}>
        <Paper 
          classes={{
            root: classes.paper
          }}
        >
          <div style={{ display: 'flex'}}>
            <Avatar src={defaultManAvatar} />
            <Typography className={clsx(classes.name, classes.field)} component="div">
              Jay Chang
            <Box className={classes.fieldHint}>
                Name
            </Box>
            </Typography>
          </div>

          <Typography className={clsx(classes.gender, classes.field)} component="div">
            男
            <Box className={classes.fieldHint}>
              Gender
            </Box>
          </Typography>

          <Typography className={clsx(classes.phone, classes.field)} component="div">
            0972666666
            <Box className={classes.fieldHint}>
              Phone
            </Box>
          </Typography>

          <Typography className={clsx(classes.email, classes.field)} component="div">
            email@gmail.com
            <Box className={classes.fieldHint}>
              Email
            </Box>
          </Typography>

          <Typography className={clsx(classes.birthday, classes.field)} component="div">
            1995/01/01
            <Box className={classes.fieldHint}>
              Birthday
            </Box>
          </Typography>

          <Typography className={clsx(classes.birthday, classes.field)} component="div">
            <span style={{ color: 'rgb(67, 160, 71)' }}>
              Active
            </span>
            <Box className={classes.fieldHint}>
              Status
            </Box>
          </Typography>

          <div>
            <Button
              color="primary" 
              variant="outlined" 
              size="small"
            >
              View
            </Button>

            <IconButton onClick={this.handleOpenMenu}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={this.state.menuAnchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={!!this.state.menuAnchorEl}
              onClose={this.handleCloseMenu}
            >
              <MenuItem onClick={this.handleCloseMenu}>
                <ListItemIcon className={classes.menuIcon}>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary="Delete" />
              </MenuItem>
              <MenuItem onClick={this.handleCloseMenu}>
                <ListItemIcon className={classes.menuIcon}>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Edit" />
              </MenuItem>
            </Menu>
          </div>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(MemberItem)