import { connect } from "react-redux";

import ProjectDetail from './Detail'
import { RootState } from "stores";
import { ThunkDispatch } from "redux-thunk";
import { fetchProjectBaseInfo, fetchProjectTasks, clearProjectDetail } from "stores/project/action";

const mapStateToProps = (state: RootState) =>({
    project: state.project.projectDetail.baseInfo
})

const mapActionToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async (id: string) => {
        await Promise.all([
            dispatch(fetchProjectBaseInfo(id)),
            dispatch(fetchProjectTasks(id))
        ])
    },
    leave: () => {
        dispatch(clearProjectDetail())
    }
})

export default connect(
    mapStateToProps,
    mapActionToProps
)(ProjectDetail)