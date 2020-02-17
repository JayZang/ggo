import { Theme, createStyles } from "@material-ui/core";

export default (theme: Theme) => createStyles({
    leftBlock: {
        width: 300,
        flexShrink: 0
    },
    rightBlock: {
        flexGrow: 1
    },
    contentWrapper: {
        padding: 0
    }
}) 