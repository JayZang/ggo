import React from 'react'
import { useTheme, WithStyles, withStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Button from '@material-ui/core/Button'

import MemberSearchBar from './SearchBar'
import AddMemberBtn from './AddMemberBtn'
import MemberFilterBtn from './FilterBtn'
import styles from './styles'

interface IProps extends WithStyles<typeof styles> {}

function Members(props: IProps) {
  const theme = useTheme()
  const classes = props.classes
  const useFabBtn = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <div className={classes.header}>
      <div className={classes.headerLeft}>
        <h2>Members</h2>
        <MemberSearchBar />
      </div>
      <div className={classes.headerBtnsContainer}>
        <AddMemberBtn useFabBtn={useFabBtn} className={classes.addMemberBtn} />
        <MemberFilterBtn useFabBtn={useFabBtn} className={classes.memberFilterBtn} />
      </div>
    </div>
  )
}

export default withStyles(styles)(Members)