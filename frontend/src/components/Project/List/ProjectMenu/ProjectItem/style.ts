import { Theme, createStyles } from "@material-ui/core";

export default (theme: Theme) => createStyles({
    root: {
        padding: theme.spacing(2, 3),
        marginBottom: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between'
    },
    fieldGrid: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'start'
    },
    fieldHint: {
        color: theme.palette.text.hint,
        fontSize: 14
    },
    fieldProjectName: {
        maxWidth: 230
    },
    fieldDate: {
        maxWidth: 100
    },
    fieldSrcType: {
        maxWidth: 230,
        display: 'flex'
    }
})