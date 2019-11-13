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
        width: 300,
        margin: theme.spacing(2)
    }
})