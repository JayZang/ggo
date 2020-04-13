import { connect } from 'react-redux';

import Login from './Login'
import { login } from 'stores/auth/action'

export default connect(null, {
    login
})(Login)