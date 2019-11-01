import { Theme, createStyles } from '@material-ui/core'

export default (theme: Theme) => createStyles({
    root: {
        position: 'relative',
        width: '100%',
        paddingLeft: theme.spacing(1.5),
    },
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1, 1, 1, 2),
        transition: '.3s ease',
        backgroundColor: theme.palette.common.white,
        zIndex: 1,
        position: 'relative'
    },
    wrapperTransform: {
        transform: 'translateX(-80px)'
    },
    textHint: {
        color: theme.palette.text.hint,
        fontSize: 12
    },
    name: {
        width: 100
    },
    phone: {
        flexGrow: 1
    },
    deleteBtnWrapper: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 80,
        height: '100%',
        display: 'flex',
        alignItems: 'center'
    }
})