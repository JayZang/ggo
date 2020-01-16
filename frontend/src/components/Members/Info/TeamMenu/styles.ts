import { Theme, createStyles } from '@material-ui/core'

export default (theme: Theme) => createStyles({
    cardHeaderRoot: {
        padding: theme.spacing(1, 1 , 1, 2)
    },
    cardHeaderActionButton: {
        padding: theme.spacing(0.5)
    },
    cardContentRoot: {
        padding: '0!important'
    },
    cardItem: {
        borderBottom: '1px solid #eeeeee',
        padding: theme.spacing(2),
        justifyContent: 'space-between'
    },
    leaderBar: {
        borderLeftColor: theme.palette.primary.main,
        borderLeft: '3px solid',
        paddingLeft: theme.spacing(1.5)
    },
    nonLeaderBar: {
        borderLeftColor: theme.palette.grey[500],
        borderLeft: '3px solid',
        paddingLeft: theme.spacing(1.5)
    }
})