import { connect } from 'react-redux'

import EmergencyContactItem from './EmergencyContactItem'
import { deleteEmergencyContact } from 'stores/member/action'

export default connect(null, {
    onDelete: deleteEmergencyContact
})(EmergencyContactItem)