import { Theme, createStyles } from "@material-ui/core";

export default (theme: Theme) => createStyles({
    root: {
        padding: theme.spacing(1.5, 3),
        marginBottom: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        height: 75
    },
    fieldGrid: {
        display: 'flex',
        flexBasis: 0,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    fieldHint: {
        color: theme.palette.text.hint,
        fontSize: 14
    }
})