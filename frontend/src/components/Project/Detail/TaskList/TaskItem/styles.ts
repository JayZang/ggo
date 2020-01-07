import { Theme, createStyles } from "@material-ui/core";

export default (theme: Theme) => createStyles({
    fieldTaskName: {
        width: 250,
        display: 'flex'
    },
    fieldHint: {
        color: theme.palette.text.hint,
        fontSize: 14
    }
})