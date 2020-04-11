import { connect } from "react-redux";

import ProjectCountBar from './ProjectCountBar'
import { RootState } from "stores";

const mapStateToProps = (state: RootState) => ({
    totalCount: state.project.listPage.totalCount,
    srcTypeInternalCount: state.project.listPage.srcTypeInternalCount,
    srcTypeCustomerCount: state.project.listPage.srcTypeCustomerCount
})

export default connect(mapStateToProps)(ProjectCountBar)