import { connect } from 'react-redux'

import TeamSelectionMenu from 'components/Teams/SelectionMenu/SelectionMenu'
import { RootState } from 'stores'
import { fetchTeamSelection } from 'stores/task/action'

const mapStateToProps = (state: RootState) => ({
    teams: state.task.editPanel.teams || []
})

export default connect(mapStateToProps, {
    fetchTeam: fetchTeamSelection
})(TeamSelectionMenu)