import { Theme, createStyles } from "@material-ui/core";

export default (theme: Theme) => createStyles({
    gridItem: {
        width: '100%'
    },
    label: {
        textTransform: 'uppercase',
        color: 'rgba(13, 27, 62, 0.7)',
        fontWeight: 'bold',
        marginBottom: theme.spacing(0.5)
    },
    textarea: {
        minHeight: 60,
        '&:focus': {
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
            boxShadow: 'none'
        }
    },
    memberSelectionWrapper: {
        padding: theme.spacing(1, 2),
        overflowY: 'auto'
    },
    leaderName: {
        fontWeight: 500
    },
    leaderHint: {
        color: theme.palette.text.hint
    }
})