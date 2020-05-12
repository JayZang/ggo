import { connect } from 'react-redux';

import CustomerEditPanel from './CustomerEditPanel'
import { createCustomer, updateCustomer, fetchIndustryCategories } from 'stores/customer/action';
import { RootState } from 'stores';

const mapStateToProps = (state: RootState) => ({
    industryCategories: state.customer.industryCategories
})

export default connect(mapStateToProps, {
    createCustomer,
    updateCustomer,
    load: fetchIndustryCategories
})(CustomerEditPanel)