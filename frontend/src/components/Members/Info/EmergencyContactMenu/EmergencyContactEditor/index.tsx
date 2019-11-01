import { connect } from 'react-redux'

import EmergencyContactEditor from './EmergencyContactEditor'
import { createEmergencyContact } from 'stores/member/action'

export default connect(null, {
    onCreate: createEmergencyContact
})(EmergencyContactEditor)