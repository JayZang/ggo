import { connect } from 'react-redux';

import CustomerEditPanel from './CustomerEditPanel'
import { createCustomer } from 'stores/customer/action';

export default connect(null, {
    createCustomer
})(CustomerEditPanel)