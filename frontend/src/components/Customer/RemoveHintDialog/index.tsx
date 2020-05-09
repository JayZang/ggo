import { connect } from 'react-redux';

import { removeCustomer } from 'stores/customer/action';
import CustomerRemoveHintDialog from './RemoveHintDialog'

export default connect(null, {
    remove: removeCustomer
})(CustomerRemoveHintDialog)