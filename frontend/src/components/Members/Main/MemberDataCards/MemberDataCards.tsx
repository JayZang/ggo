import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import Circle from 'react-circle';
import { withStyles, WithStyles, Theme, createStyles } from '@material-ui/core/styles'
import PersonIcon from '@material-ui/icons/Person'
import clsx from 'clsx'
import { Box, Tooltip } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        marginTop: theme.spacing(2)
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        flexBasis: 0,
        padding: theme.spacing(2),
        '& + *': {
            marginLeft: theme.spacing(3)
        }
    },
    iconContainer: {
        borderRadius: '50%',
        overflow: 'hidden',
        fontSize: 36,
        padding: theme.spacing(1),
        color: theme.palette.common.white,
        display: 'flex',
        marginRight: theme.spacing(3)
    },
    icon: {
        fontSize: 40
    },
    title: {
        color: theme.palette.text.hint,
        fontWeight: theme.typography.fontWeightMedium,
        textTransform: 'uppercase'
    },
    number: {
        fontSize: 36,
        fontWeight: theme.typography.fontWeightBold,
        lineHeight: 1,
        marginTop: theme.spacing(1)
    },
    totalMemberCard: {
        borderBottom: `4px solid ${theme.palette.primary.main}`
    },
    totalMemberIconContainer: {
        backgroundColor: theme.palette.primary.main
    },
    activeMemberCard: {
        borderBottom: `4px solid #28a745`
    },
    inactiveMemberCard: {
        borderBottom: `4px solid #ffc107`
    }
})

interface IProps extends WithStyles<typeof styles> {
    totalMembers: number
    activeMembers: number
    inactiveMembers: number
    loadedMembers: number
}

class MemberDataCards extends Component<IProps> {
    render() {
        const {
            classes,
            totalMembers,
            activeMembers,
            inactiveMembers,
            loadedMembers
        } = this.props

        return (
            <div className={classes.root}>
                <Card className={clsx(classes.card, classes.totalMemberCard)}>
                    <div className={clsx(classes.iconContainer, classes.totalMemberIconContainer)}>
                        <PersonIcon className={classes.icon} />
                    </div>
                    <div>
                        <div className={classes.title}>總數</div>
                        <div className={classes.number}>
                            {totalMembers}
                        </div>
                    </div>
                    <Tooltip
                        title={`載入筆數：${loadedMembers} / ${totalMembers}`}
                        placement="bottom"
                    >
                        <Box marginLeft="auto" textAlign="center">
                            <Circle 
                                progress={parseInt((loadedMembers / totalMembers * 100) as any) || 0}
                                roundedStroke
                                size="60"
                            />
                        </Box>
                    </Tooltip>
                </Card>
                <Card className={clsx(classes.card, classes.activeMemberCard)}>
                    <div className={clsx(classes.iconContainer, 'bg-success')}>
                        <PersonIcon className={classes.icon} />
                    </div>
                    <div>
                        <div className={classes.title}>可用成員數</div>
                        <div className={classes.number}>
                            {activeMembers}
                        </div>
                    </div>
                </Card>
                <Card className={clsx(classes.card, classes.inactiveMemberCard)}>
                    <div className={clsx(classes.iconContainer, 'bg-warning')}>
                        <PersonIcon className={classes.icon} />
                    </div>
                    <div>
                        <div className={classes.title}>非可用成員數</div>
                        <div className={classes.number}>
                            {inactiveMembers}
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(MemberDataCards)