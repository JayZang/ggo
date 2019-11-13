import {
    Theme,
    createStyles
} from '@material-ui/core'

export default (theme: Theme) => createStyles({
    teamsTab: {
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: 'rgba(0, 0, 0, .1)',
        padding: theme.spacing(0, 3)
    }
})