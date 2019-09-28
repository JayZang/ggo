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
    width: '100vw',
    transition: `${theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })}`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100vw - ${leftDrawerCloseWidth}px)`,
      '&.drawer-open': {
        width: `calc(100vw - ${leftDrawerOpenWidth}px)`,
      }
    }
  },
  wrapper: {
    flexGrow: 1
  }
})