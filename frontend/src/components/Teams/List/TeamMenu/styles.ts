import {
    Theme,
    createStyles
} from '@material-ui/core'

export default (theme: Theme) => createStyles({
    root: {
        padding: theme.spacing(1, 0),
        display: 'flex',
        flexWrap: 'wrap'
    },
    item: {
        width: '25%',
        display: 'flex',
        padding: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            width: '33.33%',
        },
        [theme.breakpoints.down('sm')]: {
            width: '50%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    }
})