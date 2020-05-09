import { connect } from 'react-redux';

import CustomerEditPanel from './CustomerEditPanel'
import { createCustomer, updateCustomer } from 'stores/customer/action';

export default connect(null, {
    createCustomer,
    updateCustomer
})(CustomerEditPanel)