import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { RootState } from 'stores';
import SearchBar from 'components/SearchBar'
import { clearWorkReports, fetchWorkReports, setListFilter } from 'stores/workReport/action';

const mapStateToProps = (state: RootState) => ({
    searchText: state.workReport.listPage.filter.title
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    search: async (text: string) => {
        dispatch(clearWorkReports())
        dispatch(setListFilter({ title: text || undefined }))
        await dispatch(fetchWorkReports())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar)