import { Theme, createStyles } from '@material-ui/core'

export default (theme: Theme) => createStyles({
    root: {
        padding: theme.spacing(1, 2, 2)
    },
    controlBtnsWrapper: {
        marginTop: theme.spacing(0)
    }
})