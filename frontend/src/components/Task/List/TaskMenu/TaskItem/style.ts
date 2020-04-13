import { Theme, createStyles } from "@material-ui/core";

export default (theme: Theme) => createStyles ({
    field: {
        flexGrow: 1,
        flexBasis: 0,
        margin: theme.spacing(0, 1),
        '&.taskName, &.projectName, &.assignment': {
            maxWidth: 200
        },
        '&.status, &.action': {
            maxWidth: 65
        }
    }
})