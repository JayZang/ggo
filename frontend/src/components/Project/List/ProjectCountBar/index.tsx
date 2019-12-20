import { connect } from "react-redux";

import ProjectCountBar from './ProjectCountBar'
import { RootState } from "stores";

const mapStateToProps = (state: RootState) => ({
    totalCount: state.project.statistics.totalCount,
    srcTypeInternalCount: state.project.statistics.srcTypeInternalCount,
    srcTypeCustomerCount: state.project.statistics.srcTypeCustomerCount
})

export default connect(mapStateToProps)(ProjectCountBar)