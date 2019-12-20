import { createStyles, Theme } from "@material-ui/core";

export default (theme: Theme) => createStyles({
    statisticItemRoot: {
        borderColor: theme.palette.grey[300],
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 4,
        borderBottomWidth: 3,
        borderBottomColor: 'currentColor',
        padding: theme.spacing(1.5, 2),
        color: theme.palette.primary.main
    },
    statisticItemIconWrapper: {
        padding: theme.spacing(2),
        borderRadius: '50%',
        backgroundColor: 'currentColor'
    },
    statisticItemTitle: {
        color: theme.palette.text.hint,
        fontWeight: theme.typography.fontWeightMedium,
    },
    statisticItemTitleValue: {
        fontSize: 36,
        fontWeight: theme.typography.fontWeightBold,
        lineHeight: 1,
        color: 'black'
    }
})