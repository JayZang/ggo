import TeamDetail from './Detail'
import { ThunkDispatch } from 'redux-thunk'
import { getTeamById } from 'stores/team/action'
import { connect } from 'react-redux'
import { RootState } from 'stores'

const mapStateToProps = (state: RootState) => ({
    team: state.team.teamDetail
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async (id: string | number) => {
        await dispatch(getTeamById(id))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetail)