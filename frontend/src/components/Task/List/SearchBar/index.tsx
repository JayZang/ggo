import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { RootState } from 'stores';
import SearchBar from 'components/SearchBar'
import { setListFilter, clearTaskListState, fetchTaskCountStatistic, fetchTasks } from 'stores/task/action';

const mapStateToProps = (state: RootState) => ({
    searchText: state.task.listPage.filter.name
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    search: async (text: string) => {
        dispatch(clearTaskListState())
        dispatch(setListFilter({ name: text || undefined }))
        await Promise.all([
            dispatch(fetchTaskCountStatistic()),
            dispatch(fetchTasks())
        ])
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar)