import ProjectListPage from './List'
import { connect } from 'react-redux';
import { RootState } from 'stores';
import { ThunkDispatch } from 'redux-thunk';
import { fetchProjects, fetchProjectSimpleStatistic } from 'stores/userArea/action';

const mapStateToProps = (state: RootState) => ({
    ...state.userArea.projectPage.default
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async () => {
        await Promise.all([
            dispatch(fetchProjects()),
            dispatch(fetchProjectSimpleStatistic())
        ])
    },
    fetchProjects: async () => {
        await  dispatch(fetchProjects())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectListPage)