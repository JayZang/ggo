import { connect } from 'react-redux'

import TeamList from './List'
import { getPermanentTeams, getTemporaryTeams } from 'stores/team/action'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from 'stores'

const mapStateToProps = (state: RootState) => ({
    permanentTeams: state.team.permanentTeams,
    temporaryTeams: state.team.temporaryTeams,
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async () => {
        await Promise.all([
            dispatch(getPermanentTeams()),
            dispatch(getTemporaryTeams())
        ])

        return
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamList)