import { Theme, createStyles } from '@material-ui/core/styles';

import {
  leftDrawerOpenWidth as drawerOpenWidth,
  leftDrawerCloseWidth as drawerCloseWidth
} from 'utils/viewConfig';

export default (theme: Theme) => createStyles({
  root: {
    zIndex: `${theme.zIndex.appBar - 1}!important` as any
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerOpenWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: '100vw',
    whiteSpace: 'nowrap',
    zIndex: theme.zIndex.appBar - 1,
    [theme.breakpoints.up('sm')]: {
      transition: `${theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      })}!important`,
      width: drawerCloseWidth,
      '&.open': {
        width: drawerOpenWidth
      },
      '&:hover': {
        width: drawerOpenWidth
      }
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});