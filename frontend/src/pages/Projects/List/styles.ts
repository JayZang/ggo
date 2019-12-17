import { 
    Theme, 
    createStyles 
} from "@material-ui/core";

export default (theme: Theme) => createStyles({
    searchPaper: {
        padding: theme.spacing(0.25, 1),
        marginRight: theme.spacing(1)
    }
})