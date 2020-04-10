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
import { IMember, IEmergencyContact } from 'contracts/member'
import { ITeam } from 'contracts/team'

type IProps = WithStyles<typeof styles> & {
    id: string | number
    member: IMember | null
    emergencyContacts: IEmergencyContact[] | null
    teams: ITeam[] | null
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

    async componentDidMount() {
        const { member, id } = this.props

        if (!member || member.id != id)
            await this.props.load(this.props.id)

        this.setState({ loaded: true })
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
        const emergencyContacts = loaded ? this.props.emergencyContacts : null
        const teams = loaded ? this.props.teams : null

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
                            emergencyContacts={emergencyContacts}
                        />
                        <Box className="mt-4" />
                        <TeamMenu 
                            memberId={id}
                            teams={teams} 
                        />
                    </div>
                </div>
            </AppContent>
        )
    }
}

export default withStyles(styles)(MemberInfo)