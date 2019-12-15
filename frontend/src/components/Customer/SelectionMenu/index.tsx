import { connect } from 'react-redux';

import ProjectSelectionMenu from './SelectionMenu'
import { RootState } from 'stores';

const mapStateToProps = (state: RootState) =>({
    customers: state.customer.customerMenu || []
})

export default connect(mapStateToProps)(ProjectSelectionMenu)