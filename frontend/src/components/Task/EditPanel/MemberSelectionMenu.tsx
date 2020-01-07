import { connect } from "react-redux";

import MemberSelectionMenu from 'components/Members/SelectionMenu/SelectionMenu'
import { RootState } from "stores";
import { fetchMemberSelection } from "stores/task/action";

const mapStateToProps = (state: RootState) => ({
    members: state.task.editPanel.members || []
})

export default connect(mapStateToProps, {
    fetchMember: fetchMemberSelection
})(MemberSelectionMenu)