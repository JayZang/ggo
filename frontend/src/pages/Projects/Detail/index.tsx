import { connect } from "react-redux";

import ProjectDetail from './Detail'
import { RootState } from "stores";
import { ThunkDispatch } from "redux-thunk";
import { fetchProjectBaseInfo } from "stores/project/action";

const mapStateToProps = (state: RootState) =>({
    project: state.project.projectDetail.baseInfo
})

const mapActionToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async (id: string) => {
        await dispatch(fetchProjectBaseInfo(id))
    }
})

export default connect(
    mapStateToProps,
    mapActionToProps
)(ProjectDetail)