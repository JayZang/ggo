import { createStyles, Theme } from "@material-ui/core";

export default (theme: Theme) => createStyles({
    root: {
        paddingTop: 90,
        position: 'relative'
    },
    avatar: {
        width: 130,
        height: 130,
        position: 'absolute',
        top: 0,
        zIndex: 1,
        marginLeft: theme.spacing(2)
    },
    memberName: {
        position: 'absolute',
        fontWeight: 'bold',
        top: 44,
        marginLeft: 160
    },
    editBtn: {
        position: 'absolute',
        right: 0,
        top: 40
    },
    papper: {
        position: 'relative',
        zIndex: 0,
        paddingTop: theme.spacing(5),
    },
    fieldsWrapper: {
        padding: theme.spacing(2, 2, 0, 6),
        display: 'flex',
        flexWrap: 'wrap',
    },
    field: {
        width: 'calc(33% - 15px)',
        marginRight: 15,
        marginBottom: theme.spacing(2)
    },
    fieldTitle: {
        fontSize: 14,
        color: theme.palette.text.hint
    },
    fieldName: {
        marginLeft: 5
    },
    bottomBar: {
        padding: theme.spacing(1.5, 2),
        display: 'flex',
        backgroundColor: '#F4F6F8'
    },
    statusBadge: {
        padding: theme.spacing(0.5, 1),
        borderRadius: theme.shape.borderRadius,
        fontWeight: theme.typography.fontWeightMedium,
        // boxShadow: theme.shadows[2],
        marginLeft: 'auto'
    }
})