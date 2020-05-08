import CustomerIndustryEditDialog from './Dialog'
import { connect } from 'react-redux';
import { createIndustryCategories, updateIndustryCategory, removeIndustryCategory } from 'stores/customer/action';

export default connect(null, {
    create: createIndustryCategories,
    update: updateIndustryCategory,
    remove: removeIndustryCategory
})(CustomerIndustryEditDialog)