import { connect } from 'react-redux'

import MemberSelectionMenu from './SelectionMenu'
import { RootState } from 'stores'

const mapStateToProps = (state: RootState) => ({
    members: state.member.members.list || []
})

export default connect(mapStateToProps)(MemberSelectionMenu)