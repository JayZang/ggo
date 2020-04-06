import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'

import MemberInfo from './Info'
import { 
    fetchMemberDetailInfo
} from 'stores/member/action'
import { RootState } from 'stores';

const mapStateToProps = (state: RootState) => ({
    member: state.member.infoPage.member
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async (id: number | string) => {
        await Promise.all([
            dispatch(fetchMemberDetailInfo(id))
        ])
    }
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(MemberInfo)