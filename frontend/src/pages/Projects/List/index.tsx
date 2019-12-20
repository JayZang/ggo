import { connect } from "react-redux";

import ProjectListPage from './List'
import { RootState } from "stores";
import { ThunkDispatch } from "redux-thunk";
import { getProject, reloadProject, getCountStatistic } from "stores/project/action";

const mapStateToProps = (state: RootState) => {
    const {
        projectMenu,
        statistics
    } = state.project

    return {
        projects: projectMenu,
        isProjectAllLoaded: !!projectMenu && projectMenu.length >= statistics.totalCount
    }
}

const mapActionToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async () => {
        await Promise.all([
            dispatch(getProject()),
            dispatch(getCountStatistic())
        ])
    },
    reload: async () => {
        await Promise.all([
            dispatch(reloadProject()),
            dispatch(getCountStatistic())
        ])
    },
    getProject: async () => {
        dispatch(getProject())
    }
})

export default connect(
    mapStateToProps,
    mapActionToProps
)(ProjectListPage)