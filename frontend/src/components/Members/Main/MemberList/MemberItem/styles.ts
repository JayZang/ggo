import { Theme, createStyles } from "@material-ui/core";

export default (theme: Theme) => createStyles({
    memberItem: {
        marginBottom: theme.spacing(1.5),
        position: 'relative'
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: '.2s',
        '&:hover': {
            transform: 'scale(1.02)'
        }
    },
    field: {
        marginLeft: theme.spacing(3)
    },
    fieldHint: {
        fontSize: 14,
        color: theme.palette.text.hint,
        fontWeight: theme.typography.fontWeightMedium
    },
    name: {
        fontWeight: 'bold',
        maxWidth: 170,
        width: 170,
        flexGrow: 1
    },
    gender: {
        maxWidth: 70,
        flexGrow: 1,
    },
    phone: {
        maxWidth: 100,
        flexGrow: 1,
    },
    email: {
        maxWidth: 160,
        flexGrow: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    birthday: {
        maxWidth: 110,
        flexGrow: 1,
    },
    menuIcon: {
        minWidth: 38,
        color: theme.palette.grey[600]
    },
    isDeleting: {
        opacity: 0.7,
        pointerEvents: 'none',
        transform: 'scale(.97)'
    }
})