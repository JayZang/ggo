import { Theme, createStyles } from '@material-ui/core/styles'

export default (theme: Theme) => createStyles({
    root: {
        padding: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1, 0),
            marginBottom: `calc(env(safe-area-inset-bottom) + 60px)`
        }
    },
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
        width: 156,
        [theme.breakpoints.down('xs')]: {
            width: 0
        }
    },
    headerTitle: {
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            display: 'none'
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
            bottom: `calc(env(safe-area-inset-bottom) + 140px)`
        }
    },
    memberFilterBtn: {
        [theme.breakpoints.down('xs')]: {
            position: 'fixed',
            right: 25,
            bottom: `calc(env(safe-area-inset-bottom) + 80px)`
        }
    }
})