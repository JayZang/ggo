import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import { withStyles, WithStyles, Theme, createStyles } from '@material-ui/core/styles'
import GroupRoundedIcon from '@material-ui/icons/GroupRounded'
import clsx from 'clsx'

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    marginTop: theme.spacing(3)
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    padding: theme.spacing(2),
    '& + *': {
      marginLeft: theme.spacing(3)
    }
  },
  iconContainer: {
    borderRadius: '50%',
    overflow: 'hidden',
    fontSize: 36,
    padding: theme.spacing(1),
    color: theme.palette.common.white,
    display: 'flex',
    marginRight: theme.spacing(3)
  },
  icon: {
    fontSize: 40
  },
  title: {
    color: theme.palette.text.hint,
    fontWeight: theme.typography.fontWeightMedium,
    textTransform: 'uppercase'
  },
  number: {
    fontSize: 36,
    fontWeight: theme.typography.fontWeightBold,
    lineHeight: 1,
    marginTop: theme.spacing(1)
  },
  totalMemberCard: {
    borderBottom: `4px solid ${theme.palette.primary.main}`
  },
  totalMemberIconContainer: {
    backgroundColor: theme.palette.primary.main
  },
  activeMemberCard: {
    borderBottom: `4px solid #28a745`
  },
  inactiveMemberCard: {
    borderBottom: `4px solid #ffc107`
  }
})

interface IProps extends WithStyles<typeof styles> { 
  totalMembers: number,
  activeMembers: number,
  inactiveMembers: number
}

class MemberDataCards extends Component<IProps> {
  render() {
    const classes = this.props.classes

    return (
      <div className={classes.root}>
        <Card className={clsx(classes.card, classes.totalMemberCard)}>
          <div className={clsx(classes.iconContainer, classes.totalMemberIconContainer)}>
            <GroupRoundedIcon className={classes.icon} />
          </div>
          <div>
            <div className={classes.title}>Total Members</div>
            <div className={classes.number}>
              { this.props.totalMembers }
            </div>
          </div>
        </Card>
        <Card className={clsx(classes.card, classes.activeMemberCard)}>
          <div className={clsx(classes.iconContainer, 'bg-success')}>
            <GroupRoundedIcon className={classes.icon} />
          </div>
          <div>
            <div className={classes.title}>Active Members</div>
            <div className={classes.number}>
              { this.props.activeMembers }
            </div>
          </div>
        </Card>
        <Card className={clsx(classes.card, classes.inactiveMemberCard)}>
          <div className={clsx(classes.iconContainer, 'bg-warning')}>
            <GroupRoundedIcon className={classes.icon} />
          </div>
          <div>
            <div className={classes.title}>Inactive Members</div>
            <div className={classes.number}>
              { this.props.inactiveMembers }
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(MemberDataCards)