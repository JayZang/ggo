import { connect } from "react-redux";

import ProjectListPage from './List'
import { RootState } from "stores";
import { ThunkDispatch } from "redux-thunk";
import { getProject, reloadProject } from "stores/project/action";

const mapStateToProps = (state: RootState) => ({
    projects: state.project.projectMenu
})

const mapActionToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async () => {
        await dispatch(getProject())
    },
    reload: async () => {
        await dispatch(reloadProject())
    }
})

export default connect(
    mapStateToProps,
    mapActionToProps
)(ProjectListPage)