import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'

import MemberInfo from './Info'
import { getMemberBaseInfo, clearMemberInfo } from 'stores/member/action'

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    loadMember: async (id: number | string) => {
        await dispatch(getMemberBaseInfo(id))
    },
    clearMember: () => {
        dispatch(clearMemberInfo())
    }
})

export default connect(null, mapDispatchToProps)(MemberInfo)