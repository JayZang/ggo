import {
    Theme,
    createStyles
} from '@material-ui/core'

export default (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
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
        marginLeft: theme.spacing(1),
        overflow: 'hidden'
    },
    leaderAvatar: {
        width: 60,
        height: 60
    },
    leaderName: {
        fontSize: 18,
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    leaderEamil: {
        color: theme.palette.text.hint,
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    footerCardContent: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1.5, 2)
    },
    countWrapper: {
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.primary.main
    },
    countNumber: {
        fontSize: 16,
        marginLeft: theme.spacing(0.5)
    },
    button: {
        minWidth: 40
    }
})