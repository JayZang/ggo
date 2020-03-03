import { connect } from 'react-redux';

import UserTable from './Table'
import { configUserLoginable, deleteUsers } from 'stores/iam/action';

export default connect(null, {
    onUserLoginableChange: configUserLoginable,
    deleteUsers
})(UserTable)