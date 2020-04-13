import React, { useEffect } from 'react'
import { Box, Tooltip, IconButton } from '@material-ui/core'
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

    const trackScrolling = () => {
        if (isFetching)
            return

        if (window.innerHeight + window.pageYOffset >= document.body.scrollHeight) {
            isFetching = true
            props.fetchMembers().finally(() => {
                isFetching = false
            })
        }
    }

    // componentDidMount
    useEffect(() => {
        members || (() => {
            isFetching = true
            props.load().finally(() => {
                isFetching = false
            })
        })()
        document.addEventListener('scroll', trackScrolling);

        return () => {
            document.removeEventListener('scroll', trackScrolling);
        }
    }, [])

    return (
        <AppContent
            mobileHeader={
                <MobileHeader
                    title="Member"
                    defaultHidden={false}
                />
            }
        >
            <div className={classes.header}>
                <div className={classes.headerLeft}>
                    <h3 className={classes.headerTitle}>成員管理</h3>
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