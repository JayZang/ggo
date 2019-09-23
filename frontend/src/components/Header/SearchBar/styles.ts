import { Theme, createStyles } from '@material-ui/core/styles';

export default (theme: Theme) => createStyles({
  search: {
    position: 'relative',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    transition: '.4s ease',
    [theme.breakpoints.up('sm')]: {
      width: 'auto'
    },
  },
  searchIcon: {
    borderRadius: '50%',
    backgroundColor: 'rgb(211, 215, 237)',
    color: theme.palette.primary.main,
    width: '35px',
    height: '35px',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: theme.zIndex.tooltip,
  },
  inputRoot: {
    color: 'inherit',
    marginLeft: theme.spacing(2),
    marginTop: 1,
    paddingLeft: theme.spacing(4),
    backgroundColor: 'rgba(211, 215, 237, .4)',
    borderRadius: 16,
    width: '100%'
  },
  inputInput: {
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 100,
      '&:focus': {
        width: 250
      }
    },
  },
})