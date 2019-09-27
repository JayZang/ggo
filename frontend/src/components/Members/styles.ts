import { Theme, createStyles } from '@material-ui/core/styles'

export default (theme: Theme) => createStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  headerLeft: {
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  headerBtnsContainer: {
    width: 140,
    [theme.breakpoints.down('xs')]: {
      width: 0
    }
  },
  addMemberBtn: {
    marginBottom: theme.spacing(1),
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
      position: 'fixed',
      right: 25,
      bottom: `calc(env(safe-area-inset-bottom) + 130px)`
    }
  },
  memberFilterBtn: {
    [theme.breakpoints.down('xs')]: {
      position: 'fixed',
      right: 25,
      bottom: `calc(env(safe-area-inset-bottom) + 70px)`
    }
  }
})