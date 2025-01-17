import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import MemberList from './Main'
import { clearMembers, fetchMembers, fetchMemberCountStatistic } from 'stores/member/action';
import { RootState } from 'stores';

const mapStateToProps = (state: RootState) => {
    const members = state.member.listPage
    return {
        members: members.list,
        isAllMemberFetched: !!members.list && members.list.length >= members.totalCount
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async () => {
        await Promise.all([
            dispatch(fetchMemberCountStatistic()),
            dispatch(fetchMembers())
        ])
    },
    reload: async () => {
        dispatch(clearMembers())
        await Promise.all([
            dispatch(fetchMemberCountStatistic()),
            dispatch(fetchMembers())
        ])
    },
    fetchMembers: async () => {
        await dispatch(fetchMembers())
    }
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(MemberList)