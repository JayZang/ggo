import { connect } from "react-redux";

import ProjectListPage from './List'
import { RootState } from "stores";
import { loadListPage, reloadListPage, fetchProjects } from "stores/project/action";

const mapStateToProps = (state: RootState) => {
    const { projects, totalCount } = state.project.listPage

    return {
        projects,
        isProjectAllLoaded: !!projects && projects.length >= totalCount
    }
}

export default connect(mapStateToProps, {
    load: loadListPage,
    reload: reloadListPage,
    getProject: fetchProjects
})(ProjectListPage)