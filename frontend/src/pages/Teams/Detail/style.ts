import { Theme, createStyles } from "@material-ui/core";

export default (theme: Theme) => createStyles({
    leftBlock: {
        minWidth: 300,
        maxWidth: 350,
        flexGrow: 1
    },
    rightBlock: {
        flexGrow: 1
    }
}) 