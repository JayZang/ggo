import {
    Theme,
    createStyles
} from '@material-ui/core'

export default (theme: Theme) => createStyles({
    avatar: {
        marginRight: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        width: 48,
        flexShrink: 0
    },
    fieldsWrapper: {
        marginRight: theme.spacing(2),
        flexGrow: 1,
        flexBasis: 0,
        maxWidth: 200,
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    fieldHint: {
        color: theme.palette.text.hint,
        fontSize: 14
    }
})