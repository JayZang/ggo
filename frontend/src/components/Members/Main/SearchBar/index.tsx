import { connect } from 'react-redux';
import SearchBar from 'components/SearchBar'
import { ThunkDispatch } from 'redux-thunk';
import { fetchMembers, clearMembers, fetchMemberCountStatistic } from 'stores/member/action';

const mapDispatchToProp = (dispatch: ThunkDispatch<any, any, any>) => ({
    search: async (text: string) => {
        dispatch(clearMembers())
        await Promise.all([
            dispatch(fetchMemberCountStatistic({ name: text || undefined })),
            dispatch(fetchMembers({ name: text || undefined }))
        ])
    }
})

export default connect(null, mapDispatchToProp)(SearchBar)