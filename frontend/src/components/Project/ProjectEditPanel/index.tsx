import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { createProject, updateProject, fetchCustomerSelectionMenu, fetchMemberSelectionMenu, fetchTeamSelectionMenu } from "stores/project/action";
import ProjectEditPanel from './ProjectEditPanel'
import { RootState } from "stores";

const mapStateToProps = (state: RootState) => ({
    customerSelections: state.project.editPanel.customerSelectionMenu,
    memberSelections: state.project.editPanel.memberSelectionMenu,
    teamSelections: state.project.editPanel.teamSelectionMenu
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    createProject: async (data: any) => {
        await dispatch(createProject(data))
    },
    updateProject: async (id: number | string, data: any) => {
        await dispatch(updateProject(id, data))
    },
    load: async () => {
        await Promise.all([
            dispatch(fetchCustomerSelectionMenu()),
            dispatch(fetchMemberSelectionMenu()),
            dispatch(fetchTeamSelectionMenu())
        ])
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectEditPanel)