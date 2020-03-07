import { connect } from 'react-redux';

import MemberRegisterUserDialog from './RegisterUserDialog'
import { registerUser } from 'stores/iam/action';

export default connect(null, {
    register: registerUser
})(MemberRegisterUserDialog)