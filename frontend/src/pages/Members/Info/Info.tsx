import React, { Component } from 'react'
import { 
    withStyles,
    WithStyles,
    Box
} from '@material-ui/core'

import AppContent from 'pages/App/Content'
import MobileHeader from 'components/MobileHeader'
import MemberBaseInfoCard from 'components/Members/Info/BaseInfoCard'
import EmergencyContactMenu from 'components/Members/Info/EmergencyContactMenu'
import TeamMenu from 'components/Members/Info/TeamMenu'
import styles from './styles'

type IProps = WithStyles<typeof styles> & {
    id: string | number
    load: (id: string | number) => Promise<void>,
    clearMember: () => void
}

class MemberInfo extends Component<IProps> {
    componentDidMount() {
        this.props.load(
            this.props.id
        )
    }

    componentWillUnmount() {
        this.props.clearMember()
    }

    render() {
        const { 
            id,
            classes
        } = this.props

        return (
            <AppContent
                mobileHeader={(
                    <MobileHeader
                        title="成員資訊"
                        defaultHidden={false}
                    />
                )}
            >
                <div className={classes.row1}>
                    <div className={classes.memberBaseInfoWrapper}>
                        <MemberBaseInfoCard />
                    </div>
                    <div className={classes.emergencyContactMenuWrapper}>
                        <EmergencyContactMenu memberId={id}/>
                        <Box className="mt-4" />
                        <TeamMenu memberId={id} />
                    </div>
                </div>
            </AppContent>
        )
    }
}

export default withStyles(styles)(MemberInfo)