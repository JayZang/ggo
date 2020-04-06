import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { RootState } from 'stores'
import TeamDetail from './Detail'
import { fetchTeamDetailInfo, fetchTeamTasks } from 'stores/team/action'

const mapStateToProps = (state: RootState) => ({
    team: state.team.infoPage.team,
    tasks: state.team.infoPage.tasksOfTeam.tasks,
    taskTotalCount: state.team.infoPage.tasksOfTeam.totalCount
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    load: async (id: string | number) => {
        await Promise.all([
            dispatch(fetchTeamDetailInfo(id)),
            dispatch(fetchTeamTasks(id, true))
        ])
    },
    fetchTasks: async (id: string | number) => {
        await dispatch(fetchTeamTasks(id))
    }
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(TeamDetail)