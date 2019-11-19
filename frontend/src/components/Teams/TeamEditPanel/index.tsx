import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'

import TeamEditPanel from './TeamEditPanel'
import { fetchMembers } from 'stores/member/action'
import { createTeam, getTemporaryTeams, getPermanentTeams } from 'stores/team/action'

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async function () {
        await Promise.all([
            // 載入成員，成員選擇元件才可以得到成員列表
            dispatch(fetchMembers())
        ])
        
        return 
    },
    create: async function (data: any) {
        await dispatch(createTeam(data))
    }
})

export default connect(null, mapDispatchToProps)(TeamEditPanel)