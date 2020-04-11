import { connect } from "react-redux";

import { RootState } from "stores";
import { fetchMemberSelection } from "stores/task/action";
import MemberSelectionMenu from 'components/Members/SelectionMenu'

const mapStateToProps = (state: RootState) => ({
    members: state.task.editPanel.memberSelection || []
})

export default connect(mapStateToProps)(MemberSelectionMenu)