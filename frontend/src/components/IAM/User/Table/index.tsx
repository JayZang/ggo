import { connect } from 'react-redux';

import UserTable from './Table'
import { configUserLoginable, deleteUsers, resetUserPassword } from 'stores/iam/action';

export default connect(null, {
    onUserLoginableChange: configUserLoginable,
    resetUserPassword,
    deleteUsers
})(UserTable)