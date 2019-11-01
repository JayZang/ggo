import { Theme, createStyles } from '@material-ui/core'

export default (theme: Theme) => createStyles({
    cardHeaderRoot: {
        padding: theme.spacing(1)
    },
    cardHeaderAction: {
        marginTop: 0,
        marginRight: 0
    },
    cardHeaderActionButton: {
        padding: theme.spacing(0.5)
    },
    addIcon: {
        transition: '.3s ease'
    },
    addIconRotate: {
        transform: 'rotate(45deg)'
    },
    cardContentRoot: {
        padding: '0!important'
    },
    cardItem: {
        borderBottom: '1px solid #eeeeee',
        padding: 0
    }
})