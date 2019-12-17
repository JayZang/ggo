import { connect } from "react-redux";

import ProjectEditPanel from './ProjectEditPanel'
import { createProject, getCustomerSelectionMenu } from "stores/project/action";
import { RootState } from "stores";

const mapStateToProps = (state: RootState) => ({
    customers: state.project.customerSelectionMenu
})

export default connect(mapStateToProps, {
    createProject,
    load: getCustomerSelectionMenu
})(ProjectEditPanel)