import { Theme, createStyles } from "@material-ui/core";

export default (theme: Theme) => createStyles({
    root: {
        width: '100%'
    },
    searchBarPaper: {
        padding: theme.spacing(1)
    },
    searchBarIcon: {
        padding: theme.spacing(1)
    },
    email: {
        color: theme.palette.text.hint
    },
    listWrapper: {
        maxHeight: 290,
        overflowY: 'auto'
    }
})