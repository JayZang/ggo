import { Theme, createStyles } from '@material-ui/core/styles';

import { 
  symbolicColor,
  leftDrawerOpenWidth, 
  leftDrawerCloseWidth 
} from 'utils/viewConfig';

export default (theme: Theme) => createStyles({
  root: {
    boxShadow: theme.shadows[0],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderColor: theme.palette.grey[300]
  },
  grow: {
    flexGrow: 1,
  },
  leftArea: {
    display: 'flex',
    width: leftDrawerCloseWidth - theme.spacing(3),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: theme.spacing(1),
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('sm')]: {
      transform: `translateX(-${theme.spacing(1)}px)`,
      '&.open': {
        width: leftDrawerOpenWidth - theme.spacing(2)
      }
    }
  },
  title: {
    display: 'none',
    color: symbolicColor,
    textOverflow: 'inherit',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});