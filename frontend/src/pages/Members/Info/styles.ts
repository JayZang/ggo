import { Theme, createStyles } from '@material-ui/core'

export default (theme: Theme) => createStyles({
    row1: {
        display: 'flex'
    },
    memberBaseInfoWrapper: {
        flexGrow: 1,
    },
    emergencyContactMenuWrapper: {
        width: 350,
        marginLeft: theme.spacing(4),
        marginTop: theme.spacing(5),
        whiteSpace: "nowrap"
    }
})