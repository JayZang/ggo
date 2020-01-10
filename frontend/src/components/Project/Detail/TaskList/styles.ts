import { Theme, createStyles } from "@material-ui/core";
import { lighten } from '@material-ui/core/styles'

export default (theme: Theme) => createStyles({
    tabsWrapper: {
        minHeight: 30
    },
    tabItem: {
        minHeight: 30,
        minWidth: '100px!important',
        '& + button': {
            borderLeft: '1px solid rgba(0, 0, 0, .1)'
        }
    }, 
    progressingBarContainer: {
        backgroundColor: lighten('#007bff', 0.8)
    },
    progressingBarIndicator: {
        backgroundColor: 'var(--primary)'
    },
    pauseBarContainer: {
        backgroundColor: lighten('#ffc107', 0.8)
    },
    pauseBarIndicator: {
        backgroundColor: 'var(--warning)'
    },
    terminatedBarContainer: {
        backgroundColor: lighten('#dc3545', 0.8)
    },
    terminatedBarIndicator: {
        backgroundColor: 'var(--danger)'
    },
    successBarContainer: {
        backgroundColor: lighten('#28a745', 0.8)
    },
    successBarIndicator: {
        backgroundColor: 'var(--success)'
    },
    expiredBarContainer: {
        backgroundColor: lighten('#6c757d', 0.8)
    },
    expiredBarIndicator: {
        backgroundColor: 'var(--secondary)'
    },
})