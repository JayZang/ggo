import { connect } from "react-redux";

import ProjectBaseInfoPanel from './BaseInfoPanel'
import { RootState } from "stores";

const mapStateToProps = (state: RootState) => ({
    project: state.project.projectDetail.baseInfo
})

export default connect(mapStateToProps)(ProjectBaseInfoPanel)