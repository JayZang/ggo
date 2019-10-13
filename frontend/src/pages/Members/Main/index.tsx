import React from 'react'
import { useTheme, WithStyles, withStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import MobileHeader from 'components/MobileHeader'
import MemberSearchBar from 'components/Members/Main/SearchBar'
import MemberDataCards from 'components/Members/Main/MemberDataCards'
import AddMemberBtn from 'components/Members/Main/AddMember/Button'
import MemberFilterBtn from 'components/Members/Main/FilterMember/Button'
import MemberList from 'components/Members/Main/MemberList'
import styles from './styles'

interface IProps extends WithStyles<typeof styles> { }

function Members(props: IProps) {
    const theme = useTheme()
    const classes = props.classes
    const useFabBtn = useMediaQuery(theme.breakpoints.down('xs'))

    return (
        <div>
            <MobileHeader
                title="Member"
                defaultHidden={false}
            />
            <div className={classes.root}>
                <div className={classes.header}>
                    <div className={classes.headerLeft}>
                        <h3 className={classes.headerTitle}>成員管理</h3>
                        <MemberSearchBar />
                    </div>
                    <div className={classes.headerBtnsContainer}>
                        <AddMemberBtn useFabBtn={useFabBtn} className={classes.addMemberBtn} />
                        <MemberFilterBtn useFabBtn={useFabBtn} className={classes.memberFilterBtn} />
                    </div>
                </div>
                <MemberDataCards />
                <MemberList />
            </div>
        </div>
    )
}

export default withStyles(styles)(Members)