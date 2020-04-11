import { connect } from "react-redux";

import ProjectDetail from './Detail'
import { RootState } from "stores";
import { ThunkDispatch } from "redux-thunk";
import { fetchProjectDetailInfo } from "stores/project/action";

const mapStateToProps = (state: RootState) =>({
    project: state.project.infoPage.project,
    tasks: state.project.infoPage.tasks
})

const mapActionToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async (id: string) => {
        await Promise.all([
            dispatch(fetchProjectDetailInfo(id))
        ])
    }
})

export default connect(
    mapStateToProps,
    mapActionToProps
)(ProjectDetail)