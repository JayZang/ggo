import { createStyles, Theme } from "@material-ui/core";

export const projectItemStyle = (theme: Theme) => createStyles({
    fieldHint: {
        color: theme.palette.text.hint,
        fontSize: 14
    }
})