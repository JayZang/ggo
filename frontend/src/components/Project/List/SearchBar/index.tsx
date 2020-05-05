import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { RootState } from 'stores';
import SearchBar from 'components/SearchBar'
import { setListFilter, clearListPageState, loadListPage } from 'stores/project/action';

const mapStateToProps = (state: RootState) => ({
    searchText: state.project.listPage.filter.name
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    search: async (text: string) => {
        dispatch(clearListPageState())
        dispatch(setListFilter({ name: text || undefined }))
        await dispatch(loadListPage())
    }
})

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar)