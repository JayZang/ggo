import { connect } from "react-redux";

import ProjectEditPanel from './ProjectEditPanel'
import { createProject, updateProject, getCustomerSelectionMenu } from "stores/project/action";
import { RootState } from "stores";

const mapStateToProps = (state: RootState) => ({
    customers: state.project.customerSelectionMenu
})

export default connect(mapStateToProps, {
    createProject,
    updateProject,
    load: getCustomerSelectionMenu
})(ProjectEditPanel)