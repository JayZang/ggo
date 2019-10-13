import { createStyles, Theme } from '@material-ui/core/styles'

export default (theme: Theme) => createStyles({
  wrapper: {
    display: 'flex'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[2],
    width: '100%',
    margin: theme.spacing(0, 1),
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
      margin: 0,
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInputRoot: {
    color: 'inherit',
    width: '100%'
  },
  searchInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      minWidth: 400,
    },
  }
})