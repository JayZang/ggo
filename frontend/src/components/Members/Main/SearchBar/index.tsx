import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import SearchBar from 'components/SearchBar'
import { fetchMembers, clearMembers, fetchMemberCountStatistic, setListFilter } from 'stores/member/action';
import { RootState } from 'stores';

const mapStateToProps = (state: RootState) => ({
    searchText: state.member.listPage.filter.name
})

const mapDispatchToProp = (dispatch: ThunkDispatch<any, any, any>) => ({
    search: async (text: string) => {
        dispatch(clearMembers())
        dispatch(setListFilter({ name: text || undefined }))
        await Promise.all([
            dispatch(fetchMemberCountStatistic()),
            dispatch(fetchMembers())
        ])
    }
})

export default connect(
    mapStateToProps, 
    mapDispatchToProp
)(SearchBar)