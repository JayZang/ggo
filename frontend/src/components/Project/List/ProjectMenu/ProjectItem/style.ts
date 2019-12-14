import { Theme, createStyles } from "@material-ui/core";

export default (theme: Theme) => createStyles({
    root: {
        padding: theme.spacing(2, 3),
        marginBottom: theme.spacing(2)
    },
    fieldGrid: {
        flexGrow: 1
    },
    fieldHint: {
        color: theme.palette.text.hint,
        fontSize: 14
    }
})