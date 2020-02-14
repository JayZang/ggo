import TeamDetail from './Detail'
import { ThunkDispatch } from 'redux-thunk'
import { getTeamById } from 'stores/team/action'
import { connect } from 'react-redux'
import { RootState } from 'stores'
import { fetchMembersByTeam } from 'stores/member/action'

const mapStateToProps = (state: RootState) => ({
    team: state.team.teamDetail,
    members: state.member.teamMembers
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async (id: string | number) => {
        await Promise.all([
            dispatch(getTeamById(id)),
            dispatch(fetchMembersByTeam(id))
        ])
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetail)