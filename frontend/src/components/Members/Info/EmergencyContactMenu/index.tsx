import { connect } from 'react-redux'

import EmergencyContactMenu from './EmergencyContactMenu'
import { RootState } from 'stores'

const mapStateToProps = (store: RootState) => ({
    emergencyContacts: store.member.memberInfo.emergenctContacts
})

export default connect(mapStateToProps)(EmergencyContactMenu)