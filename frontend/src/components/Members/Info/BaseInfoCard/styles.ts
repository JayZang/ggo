import { createStyles, Theme } from "@material-ui/core";

export default (theme: Theme) => createStyles({
    root: {
        paddingTop: 90,
        position: 'relative',
        maxWidth: 900
    },
    avatar: {
        width: 130,
        height: 130,
        position: 'absolute',
        top: 0
    },
    memberName: {
        position: 'absolute',
        fontWeight: 'bold',
        top: 30,
        marginLeft: 140
    },
    papper: {
        padding: theme.spacing(7, 2, 2)      
    },
})