import { connect } from 'react-redux'

import TeamSelectionMenu from 'components/Teams/SelectionMenu'
import { RootState } from 'stores'

const mapStateToProps = (state: RootState) => ({
    teams: state.task.editPanel.teamSelection || []
})

export default connect(mapStateToProps)(TeamSelectionMenu)