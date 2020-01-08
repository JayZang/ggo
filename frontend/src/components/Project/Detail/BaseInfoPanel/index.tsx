import { connect } from "react-redux";

import ProjectBaseInfoPanel from './BaseInfoPanel'
import { RootState } from "stores";
import { finishProject } from "stores/project/action";

const mapStateToProps = (state: RootState) => ({
    project: state.project.projectDetail.baseInfo
})

export default connect(mapStateToProps, {
    finishProject
})(ProjectBaseInfoPanel)