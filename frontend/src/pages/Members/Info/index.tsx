import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'

import MemberInfo from './Info'
import { 
    getMemberBaseInfo, 
    clearMemberInfo, 
    getMemberEmergencyContacts 
} from 'stores/member/action'
import { getTeamsByMember, clearTeamsOfMember } from 'stores/team/action';

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async (id: number | string) => {
        await Promise.all([
            dispatch(getMemberBaseInfo(id)),
            dispatch(getMemberEmergencyContacts(id)),
            dispatch(getTeamsByMember(id))
        ])
    },
    clearMember: () => {
        dispatch(clearMemberInfo())
        dispatch(clearTeamsOfMember())
    }
})

export default connect(null, mapDispatchToProps)(MemberInfo)