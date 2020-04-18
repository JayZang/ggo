import { connect } from "react-redux";

import ProjectBaseInfoPanel from './BaseInfoPanel'
import { finishProject } from "stores/userArea/action";

export default connect(null, {
    finishProject
})(ProjectBaseInfoPanel)