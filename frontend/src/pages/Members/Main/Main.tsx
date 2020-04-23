import React, { useEffect } from 'react'
import { Box, Tooltip, IconButton, Typography } from '@material-ui/core'
import { useTheme, WithStyles, withStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {
    FilterList as FilterListIcon,
    Cached as CachedIcon
} from '@material-ui/icons'

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import MemberSearchBar from 'components/Members/Main/SearchBar'
import MemberDataCards from 'components/Members/Main/MemberDataCards'
import AddMemberBtn from 'components/Members/Main/AddMember/Button'
import MemberList from 'components/Members/Main/MemberList'
import MemberItemSkeleton from 'components/Members/Main/MemberList/MemberItem/Skeleton'
import styles from './styles'
import { IMember } from 'contracts/member'

const PageSymbol = Symbol('Management.Member.List')

type  IProps = WithStyles<typeof styles> & {
    load: () => Promise<void>,
    reload: () => Promise<void>,
    fetchMembers: () => Promise<void>,
    members: IMember[] | null,
    isAllMemberFetched: boolean
}

function Members(props: IProps) {
    const theme = useTheme()
    const classes = props.classes
    const members = props.members
    const useFabBtn = useMediaQuery(theme.breakpoints.down('xs'))
    let isFetching = false

    function handleScrollBottom() {
        if (isFetching)
            return

        isFetching = true
        props.fetchMembers().finally(() => {
            isFetching = false
        })
    }

    // componentDidMount
    useEffect(() => {
        members || (() => {
            isFetching = true
            props.load().finally(() => {
                isFetching = false
            })
        })()
    }, [])

    return (
        <AppContent
            mobileHeader={
                <MobileHeader
                    title="Member"
                    defaultHidden={false}
                />
            }
            onScrollBottom={handleScrollBottom}
            pageSymbol={PageSymbol}
        >
            <div className={classes.header}>
                <div className={classes.headerLeft}>
                    <Typography variant="h5" component="div">
                        <Box fontWeight={500}>成員管理</Box>
                    </Typography>
                    <Box display="flex">
                        <MemberSearchBar />
                        <Tooltip title="過濾設置">
                            <IconButton 
                                className="ml-3"
                                size="small"
                                color="primary"
                            >
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                        {(() => {
                            return members && (
                                <Tooltip title="重新載入">
                                    <IconButton 
                                        size="small"
                                        color="primary"
                                        onClick={() => props.reload()}
                                    >
                                        <CachedIcon />
                                    </IconButton>
                                </Tooltip>
                            )
                        })()}
                    </Box>
                </div>
                <div className={classes.headerBtnsContainer}>
                    <AddMemberBtn useFabBtn={useFabBtn} className={classes.addMemberBtn} />
                </div>
            </div>
            <MemberDataCards />

            <Box marginBottom={2} />

            <MemberList  members={members || []} />
            {props.isAllMemberFetched ? null : <MemberItemSkeleton />}
        </AppContent>
    )
}

export default withStyles(styles)(Members)