import { connect } from 'react-redux'

import TeamSelectionMenu from './SelectionMenu'
import { RootState } from 'stores'

const mapStateToProps = (state: RootState) => ({
    teams: []
})

export default connect(mapStateToProps)(TeamSelectionMenu)