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
import { IMember } from 'contracts/member'

type IProps = WithStyles<typeof styles> & {
    id: string | number
    member: IMember | null
    load: (id: string | number) => Promise<void>
}

type IState = {
    loaded: boolean
}

class MemberInfo extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        this.props.load(this.props.id).then(() => {
            this.setState({ loaded: true })
        })
    }

    render() {
        const { 
            id,
            classes
        } = this.props
        const {
            loaded
        } = this.state
        const member = loaded ? this.props.member : null

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
                        <MemberBaseInfoCard member={member} />
                    </div>
                    <div className={classes.emergencyContactMenuWrapper}>
                        <EmergencyContactMenu 
                            memberId={id}
                            emergencyContacts={member && member.emergencyContacts ? member.emergencyContacts : null}
                        />
                        <Box className="mt-4" />
                        <TeamMenu 
                            memberId={id}
                            teams={member && [
                                ...(member.teams_as_leader ? member.teams_as_leader : []),
                                ...(member.teams ? member.teams : [])
                            ]} 
                        />
                    </div>
                </div>
            </AppContent>
        )
    }
}

export default withStyles(styles)(MemberInfo)