import { connect } from 'react-redux'

import GroupTable from './Table'
import { deleteGroup } from 'stores/iam/action'

export default connect(null, {
    delete: deleteGroup
})(GroupTable)