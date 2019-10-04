import { createStyles, Theme } from '@material-ui/core/styles'
import {
  leftDrawerOpenWidth,
  leftDrawerCloseWidth
} from 'utils/viewConfig'

export default (theme: Theme) => createStyles({
  appWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    width: '100%',
    transition: `${theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })}`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${leftDrawerCloseWidth}px)`,
      '&.drawer-open': {
        width: `calc(100% - ${leftDrawerOpenWidth}px)`,
      }
    }
  },
  wrapper: {
    flexGrow: 1
  }
})