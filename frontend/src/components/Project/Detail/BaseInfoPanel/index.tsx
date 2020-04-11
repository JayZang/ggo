import { connect } from "react-redux";

import ProjectBaseInfoPanel from './BaseInfoPanel'
import { finishProject } from "stores/project/action";

export default connect(null, {
    finishProject
})(ProjectBaseInfoPanel)