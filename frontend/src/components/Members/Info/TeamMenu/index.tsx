import { connect } from 'react-redux';

import TeamMenu from './TeamMenu'
import { RootState } from 'stores';

const mapStateToProps = (state: RootState) => ({
    teams: state.team.teamsOfMember
})

export default connect(mapStateToProps)(TeamMenu)