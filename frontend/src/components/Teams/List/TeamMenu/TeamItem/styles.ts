import {
    Theme,
    createStyles
} from '@material-ui/core'

export default (theme: Theme) => createStyles({
    root: {
        width: 300,
        margin: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column'
    },
    topCardContent: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    teamName: {
        fontWeight: 'bold',

    },
    teamDescription: {
        flexGrow: 1,
        overflow: 'hidden',
        marginTop: theme.spacing(1)
    },
    leaderWrapper: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(2)
    },
    leaderInfoWrapper: {
        marginLeft: theme.spacing(1)
    },
    leaderAvatar: {
        width: 60,
        height: 60
    },
    leaderName: {
        fontSize: 18
    },
    leaderEamil: {
        color: theme.palette.text.hint
    },
    countWrapper: {
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.primary.main
    },
    countNumber: {
        fontSize: 20,
        marginLeft: theme.spacing(0.5)
    }
})