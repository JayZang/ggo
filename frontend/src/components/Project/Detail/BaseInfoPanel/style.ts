import { Theme, createStyles } from "@material-ui/core";

export default (theme: Theme) => createStyles({
    datesBoxRoot: {
        borderColor: theme.palette.grey[300],
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 8,
        marginBottom: theme.spacing(2)
    },
    datesBoxItem: {
        padding: theme.spacing(2),
        flexGrow: 1
    },
    remarkWrapper: {
        padding: theme.spacing(2),
        borderColor: theme.palette.grey[300],
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.07)'
    },
    customerFieldHint: {
        color: theme.palette.text.hint,
        fontSize: 14
    },
    labelIcon: {
        position: 'absolute',
        left: -5,
        top: -3,
        transform: 'rotate(90deg)',
        color: theme.palette.text.hint
    }
})